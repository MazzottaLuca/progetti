package com.emote.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class HuggingFaceService {

    @Value("${huggingface.api.key}")
    private String apiKey;

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.model}")
    private String model;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(30))
            .build();

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Genera un commento coerente con il testo originale e l'emote selezionata.
     * La chiave API non esce mai da questo metodo — Cordova non la vede mai.
     */
    public String generaCommento(String testoOriginale, String emote) {
        String prompt = costruisciPrompt(testoOriginale, emote);

        try {
            // Corpo della richiesta HuggingFace (chat completions format)
            Map<String, Object> body = Map.of(
                "model", model,
                "messages", new Object[]{
                    Map.of("role", "system", "content",
                        "Sei un utente di un social network italiano. " +
                        "Rispondi sempre in italiano, in modo naturale e conciso (max 2 frasi). " +
                        "Non usare emoji nel testo scritto. " +
                        "Il tuo tono deve rispecchiare l'emozione indicata dall'utente."),
                    Map.of("role", "user", "content", prompt)
                },
                "max_tokens", 150,
                "temperature", 0.8
            );

            String bodyJson = objectMapper.writeValueAsString(body);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://router.huggingface.co/v1/chat/completions"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(bodyJson))
                    .timeout(Duration.ofSeconds(60))
                    .build();

            HttpResponse<String> response = httpClient.send(request,
                    HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return estraiTestoRisposta(response.body());
            } else if (response.statusCode() == 401) {
                return "Errore: chiave API non valida o non autorizzata.";
            } else if (response.statusCode() == 503) {
                return "Il modello AI è in caricamento, riprova tra qualche secondo.";
            } else {
                return "Errore nella generazione del commento (HTTP " + response.statusCode() + ").";
            }

        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            return "Errore di connessione con il servizio AI.";
        }
    }

    /**
     * Costruisce il prompt spiegando al modello il contesto e l'emozione.
     */
    private String costruisciPrompt(String testoOriginale, String emote) {
        String descrizioneEmote = descriviEmote(emote);
        return String.format(
            "Commento originale: \"%s\"\n\n" +
            "L'utente ha reagito con l'emoticon %s (%s).\n" +
            "Scrivi una risposta breve e naturale a questo commento che rispecchi questa emozione.",
            testoOriginale, emote, descrizioneEmote
        );
    }

    /**
     * Mappa le emote principali in descrizioni testuali per guidare il modello.
     */
    private String descriviEmote(String emote) {
        return switch (emote) {
            case "😂" -> "risata divertita";
            case "😡" -> "rabbia o disappunto";
            case "👍" -> "approvazione e accordo";
            case "👎" -> "disapprovazione o disaccordo";
            case "❤️" -> "apprezzamento e affetto";
            case "😢" -> "tristezza o dispiacere";
            case "😮" -> "sorpresa o stupore";
            case "🤔" -> "riflessione o dubbio";
            case "🔥" -> "entusiasmo o eccitazione";
            case "👏" -> "plauso e congratulazioni";
            default -> "reazione generica";
        };
    }

    /**
     * Estrae il testo dalla risposta JSON di HuggingFace.
     */
    private String estraiTestoRisposta(String jsonBody) {
        try {
            JsonNode root = objectMapper.readTree(jsonBody);
            // Formato chat completions: choices[0].message.content
            JsonNode choices = root.path("choices");
            if (choices.isArray() && choices.size() > 0) {
                return choices.get(0).path("message").path("content").asText().trim();
            }
            // Fallback formato inference API: [0].generated_text
            if (root.isArray() && root.size() > 0) {
                return root.get(0).path("generated_text").asText().trim();
            }
            return "Risposta non disponibile.";
        } catch (Exception e) {
            return "Errore nel parsing della risposta AI.";
        }
    }

    public String getModel() {
        return model;
    }
}
