// verificar-pagamento.js

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOqjTZ2edf2puBFkZrJm1DN-vc5iOqvAo",
    authDomain: "livros-9cd3a.firebaseapp.com",
    databaseURL: "https://livros-9cd3a-default-rtdb.firebaseio.com",
    projectId: "livros-9cd3a",
    storageBucket: "livros-9cd3a.firebasestorage.app",
    messagingSenderId: "425870272898",
    appId: "1:425870272898:web:4031f4c6511c4dcd49079b"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/**
 * Verifica o status de pagamento do usuário e executa uma função de callback.
 * @param {firebase.User} user - O objeto de usuário do Firebase.
 * @param {function} callback - A função a ser executada se o usuário for pago.
 */
function verificarStatusPagamento(user, callback) {
    db.collection('users').doc(user.uid).get()
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                const agora = new Date();
                const expiracao = userData.expirationDate ? userData.expirationDate.toDate() : null;

                if (userData.pago && expiracao && expiracao > agora) {
                    callback(); // Executa a função de callback (exibirPDF)
                } else {
                    mensagemPagamento.style.display = 'block';
                    pdfContainer.style.display = 'none';
                }
            } else {
                console.error("Documento do usuário não encontrado");
                mensagemPagamento.textContent = "Erro ao verificar seu status de pagamento. Documento do usuário não encontrado.";
                mensagemPagamento.style.display = 'block';
                pdfContainer.style.display = 'none';
            }
        })
        .catch(error => {
            console.error("Erro ao buscar dados do usuário:", error);
            mensagemPagamento.textContent = "Erro ao verificar seu status de pagamento. Erro ao buscar dados do usuário.";
            mensagemPagamento.style.display = 'block';
            pdfContainer.style.display = 'none';
        });
}