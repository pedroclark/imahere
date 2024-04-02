import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { View, FlatList, SafeAreaView } from "react-native";
import { Text, TextInput, TouchableOpacity, Alert } from "react-native"; // quase toda ação precisa importar
import { Participant } from "../Componentes/Participant";
import React, { useState } from "react";
export function Home() {
  const [participants, setParticipants] = useState<string[]>([]); // participantes estado iniciial, setPArticipants para atulizar o contudo atual do estado, se usa o SET para definir um novo estado
  // participantes não é mais uma váriavel comun, agora ele é um estado
  const [participantName, setParticipantsName] = useState("");
  const currentDate = new Date();

  function handleParticipantAdd() {
    console.log(participants, participantName);
    if (participants.includes(participantName)) {
      return Alert.alert(
        "o Participante esxitente ",
        " Já existe um participante na lista com esse nome "
      );
    }
    setParticipants((prevState) => [...prevState, participantName]); /// ... - destruturar uma array. / prevState acessa o estado anteiror e adiciona ao novo estado.
    setParticipantsName("");
  }
  function handlePatricipantRemove(name: string) {
    Alert.alert("Remover", `deseja realmente remover o participante ${name}`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participants) => participants !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nameEvent}>Nome do evento </Text>
      <Text style={styles.date}>{currentDate.toLocaleDateString()}</Text>
      <StatusBar style="auto" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder=" Quem você quer convidar ?  "
          placeholderTextColor={"#ffffff"}
          onChangeText={setParticipantsName}
          value={participantName}
        />
        <TouchableOpacity style={styles.Button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants} //  ADICIONA os dados que está nas listas [articipantees]
        keyExtractor={(item) => item} // acessa o elemento do dado pelo item =>  depois da funciton usa oq ta escrito como chave no caso intem
        renderItem={(
          { item } //RenderItem pra dizer oque eu quero redenrizar para cada item dessa lista
        ) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handlePatricipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpy}>
            Nigúem foi convidado ainda ? adicione participantes em sua lista de
            presença.
          </Text>
        )}
      />
    </SafeAreaView>
  );
}
