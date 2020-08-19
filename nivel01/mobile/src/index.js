import React, { useEffect, useState } from "react";
import api from "./services/api";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAppProject() {
    const response = await api.post("/projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Samuel Santos",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item }) => (
            <Text key={item.id} style={styles.project}>
              {item.title}
            </Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={handleAppProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  project: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    margin: 20,
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default App;
