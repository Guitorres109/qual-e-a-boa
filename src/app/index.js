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

    
}