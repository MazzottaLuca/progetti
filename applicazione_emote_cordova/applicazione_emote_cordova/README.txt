app social che permette di registrarsi e scrivere commenti e reagire ai commenti con le emoji che generano commenti automatici con l'IA. Per farla funzionare in locale:

- importare il database piattaforma_emote

- inserire una chiave huggingface in emote-backend (il microservizio con spring), file application.properties

- inserire ipv4 attuale (da terminale scrivere ipconfig e copiare ipv4) in applicazione_emote_cordova\emote-app\www\js\api.js in const API_BASE

- cambiare la porta localhost di riferimento sia in application.properties sia in api.js 

- far partire da terminale l'app con cordova. il percorso deve terminare così: \applicazione_emote_cordova\emote-app

- se non parte attivare i permessi dal firewall