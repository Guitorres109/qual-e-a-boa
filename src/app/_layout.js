//==============================================================
// O Layout é a moldura que envolve todas as telas do APP
//==============================================================

// Stack: "pilha de telas". Quando o APP tem várias telas, uma abre por cima da outra, como cartas empilhadas. Vem do pacote expo-router
import { Stack } from "expo-router"

// StatusBar = Barra lá em cima do celular (relogio, bateria, sinal) 
import { StatusBar } from "expo-status-bar"

// CONCEITO
// No react native, cada pedaço da tela é um componente.
// Um componente é só uma função que devolve (return) o que aparece

// Essa função default é a principal deste arquivo, é assim que o Expo Router encontra o Layout
export default function layout() {
    return(<>
        {/* StatusBar: style="light" deixa o relógio e a bateria brancos */}
        <StatusBar style="light"/>
        {/* Stack: Pilha de telas */}
        {/* ScreenOptions: Opções que valem para todas as telas */}
        {/* headerShown: esconde a barra de titulo que o expo coloca no topo por padrão */}
        <Stack screenOptions={{headerShown: false}}/>
    </>)
}