import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import api from './services/api';


const App = () => {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    api.get('/projects').then(response => {
      console.log('response.data', response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProjectAsync() {
    const response = await api.post('projects', { title: `Novo projeto ${Date.now()}`, owner: 'Um chanmps boy ai' });
    const project = response.data;
    setProjects([...projects, project]);
  };

  return (<>
    <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello GoStack
      </Text>
      <SafeAreaView style={styles.container}      >
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => <Text style={styles.projectTitle}> {project.title}</Text>}
        />
        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProjectAsync}>
          <Text style={styles.buttonText}>Adicionar uma nova tarefa</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  </>)
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1'
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold'
  },
  projectTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});