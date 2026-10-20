//==============================================================
// Index.js - Qual é a boa?
//==============================================================

// Etapa INICIAL - TRAZER AS FERRAMENTAS (import)

import { useState, useEffect } from "react";
// View -> uma caixa, serve para agrupar e organizar as coisas.
// Text -> Todo o texto precisa estar dentro de um <text/>.
// TextInput -> Um campo para digitar.
// Pressable -> Qualquer coisa que dá pra tocar (botão).
// StyleSheet -> Ferramenta para escrever os estilos.
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
import { cores } from "../data/tema";
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";

const LIMITE_DE_FORCA = 1.8;
const TEMPO_ENTRE_SORTEIOS = 1000; // Milissegundos: 1000 = 1 segundo

export default function Home() {
    // Começa com 3 opções para já ter o que sortear
    const [opcoes, setOpcoes] = useState(["Pizza", "Hambúrger", "Sushi"]);
    // A opção que foi sorteada. Começa vazia ("") porque ainda não sorteou 
    const [resultado, setResultado] = useState("")
    // O que a pessoa estava digitando no campo. Neste caso começa vazio
    const [textoDigitado, setTextoDigitado] = useState("")

    // Função para sortear

    function sortear(){
        if (opcoes.length < 2){
            setResultado("Adicione pelo menos 2 opções")
            return
        }

        // Como sortear uma posição na lista:
        // Math.random() - números aleatorios entre 0 e 1
        // x opcoes.length - multiplica pelo tamanho da lista
        // Math.floor() - arredonda pra Baixo
        const posicao = Math.floor(Math.random() * opcoes.length)

        // opcoes[2] pega o item que esta na posição 2 da lista
        const opcaoSorteada = opcoes[posicao];
        setResultado(opcaoSorteada) // Aqui ele guarda no useState a tela atualizada!

        // Aqui faz o celular vibrar avisando que saiu o resultado
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    // Função de adicionar a opção
    function adicionar() {
        // trim: retira os espaços do fim e do começo
        const nome = textoDigitado.trim();

        if(nome === "") {
            return // Retorna nada quando o campo esta vazio
        }

        // Aqui criamos uma nova lista, com tudo o que já tinha + o nome novo
        const listaNova = [...opcoes, nome];
        setOpcoes(listaNova);
        setTextoDigitado(""); // Limpa o campo para igitar a próxima
    }

    // Função de remover uma opção
    function remover(nomeParaRemover) {
        // 
        const listaNova = opcoes.filter((opcao) => opcao !== nomeParaRemover)
        setOpcoes(listaNova);
    }

    // Sortear ao chacoalhar
    // Nós vamos usar aqui o useEffect, e o sensor
    // useEffect -> "Faça isso depois que a tela aparecer"
    // usamos para LIGAR o sensor, e para DESLIGAR quando a tela sair 
    useEffect(() => {
        // Aqui pede ao sensor para medir a cada 100 milissegundos (10x por segundo)
        Accelerometer.setUpdateInterval(100);
        // Guardaa hora do ultimo sorteio, para não sortear 10 vezes
        // Começa com zero (nunca sorteou)
        //let (e não const) porque este valor vai mudar
        let horaDoUltimoSorteio = 0

        // addListener = "Me avise toda a vez que o sensor medir algo novo"
        //"dados" chega com as medidas: dados.x, dados.y e dados.z
        const sensor = Accelerometer.addListener((dados) => {
            // Math.hypot junta x, y e z em um numero só: A força total
            const forca = Math.hypot(dados.x, dados.y, dados.z);
            const agora = Date.now();
            const tempoPassado = agora - horaDoUltimoSorteio

            // 1 - chacoalhou forte (força maior que o limite)
            // 2 - ja passou tempo suficiente desde o ultimo sorteio
            if (forca > LIMITE_DE_FORCA && tempoPassado > TEMPO_ENTRE_SORTEIOS){
                horaDoUltimoSorteio = agora
                sortear();
            }
        })

        return () => sensor.remove();
    }, [opcoes]);
}