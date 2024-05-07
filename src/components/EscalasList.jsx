import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Table,
  Td,
  Th,
  Tr,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../api/api";

const EscalasList = () => {
  const [escalas, setEscalas] = useState([]);

  useEffect(() => {
    const fetchEscalas = async () => {
      try {
        const response = await axios.get(`${baseURL}escalas`);
        setEscalas(response.data);
      } catch (error) {
        console.error("Erro ao buscar as escalas:", error);
      }
    };
    fetchEscalas();
  }, []);

  // Funções de ação (visualizar, editar, deletar) - EXEMPLOS
  const visualizarEscala = (escala) => {
    // Implementar lógica para visualizar a escala (abrir modal, etc.)
    console.log("Visualizando escala:", escala);
  };

  const editarEscala = (escala) => {
    // Implementar lógica para editar a escala (abrir modal, etc.)
    console.log("Editando escala:", escala);
  };

  const deletarEscala = (escala) => {
    // Implementar lógica para deletar a escala (confirmar, remover do array, etc.)
    console.log("Deletando escala:", escala);
  };

  const compartilharEscala = (escala) => {
    console.log("Escala " + escala + "compartilhada");
  };

  return (
    <Box backgroundColor="#ffffd7">
      <Text textAlign="center" margin="20px" fontSize="4xl" fontWeight="bold">
        Escalas
      </Text>
      <Link href="/cadastro-escala">
        <Button marginLeft="80%" colorScheme="blue">
          Nova Escala
        </Button>
      </Link>
      <Flex justify="space-around" align="center">
        <Box>
          <Table>
            <thead>
              <Tr>
                <Th>Igreja</Th>
                <Th>Horário</Th>
                <Th>Data da escala</Th>
                <Th>Tipo de cerimonia</Th>
                <Th>Ações</Th>
              </Tr>
            </thead>
            <tbody>
              {/* Renderize as escalas no corpo da tabela */}
              {escalas.map((escala, index) => (
                <Tr key={index}>
                  <Td>{escala.horarios_missa.nome_capela}</Td>
                  <Td>{escala.horario_missa}</Td>
                  <Td>{escala.data_escala}</Td>
                  <Td>{escala.tipo_cerimonia}</Td>
                  <Td>
                    <Flex justify="space-around">
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => visualizarEscala(escala)}
                      >
                        Visualizar
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="teal"
                        onClick={() => editarEscala(escala)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => deletarEscala(escala)}
                      >
                        Deletar
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="green"
                        onClick={() => compartilharEscala(escala)}
                      >
                        Compartilhar
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
};

export default EscalasList;
