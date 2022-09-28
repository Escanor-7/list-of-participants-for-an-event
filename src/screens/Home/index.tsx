import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if (participantName === '') {
      return Alert.alert('Erro ao adicionar participante', 'Digite o nome do partipante.');
    }

    if (participants.includes(participantName)) {
      return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome');
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Remover o participante ${name} ?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(participants.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container} >
      <Text style={styles.eventName} >Nome do evento</Text>
      <Text style={styles.eventDate} >21 de Setembro de 2022</Text>

      <View style={styles.form} >
        <TextInput
          style={styles.input}
          placeholder='Digite seu nome'
          placeholderTextColor='#6B6B6B'
          value={participantName}
          onChangeText={setParticipantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd} >
          <Text style={styles.buttonText} >+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant name={item} onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText} >Ninguém chegou no evento ainda ? Adicione participantes a sua lista de presença.</Text>
        )}
      />
    </View>
  )
}