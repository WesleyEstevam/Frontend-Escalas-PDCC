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
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../api/api";
import Swal from "sweetalert2";
import { DeleteIcon, ViewIcon, EditIcon } from "@chakra-ui/icons";
import { FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EscalasList = () => {
  const [escalas, setEscalas] = useState([]);
  const navigate = useNavigate();

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
    // Implementar lógica para visualizar a escala
    console.log("Visualizando escala:", escala);
  };

  const editarEscala = (id_escala) => {
    navigate(`/adicionar-coroinha?data=${JSON.stringify(id_escala)}`);
  };

  const deletarEscala = (id_escala) => {
    // Implementar lógica para deletar a escala (confirmar, remover do array, etc.)
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseURL}escalas/${id_escala}`)
          .then(() => {
            const novaLista = escalas.filter(
              (escala) => escala.id_escala !== id_escala
            );
            setEscalas(novaLista);
          })
          .catch((error) => {
            console.log("Erro ao excluir a escala: " + error);
          });
        Swal.fire({
          title: "Excluída!",
          text: "Escala excluída com sucesso!.",
          icon: "success",
        });
      }
    });
  };

  const compartilharEscala = (escala) => {
    console.log("Escala " + escala + "compartilhada");
  };

  return (
    <Box>
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
                  <Td>{escala.capelas.nome_capela}</Td>
                  <Td>{escala.horario_missa}</Td>
                  <Td>{escala.data_escala}</Td>
                  <Td>{escala.tipo_cerimonia}</Td>
                  <Td>
                    <Flex justify="space-around">
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => visualizarEscala(escala.id_escala)}
                      >
                        <ViewIcon boxSize={6} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="teal"
                        onClick={() => editarEscala(escala.id_escala)}
                      >
                        <EditIcon boxSize={6} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => deletarEscala(escala.id_escala)}
                      >
                        <DeleteIcon boxSize={6} />
                      </Button>
                      <IconButton
                        aria-label="Compartilhar"
                        icon={<FaShare />}
                        size="md"
                        variant="ghost"
                        colorScheme="green"
                        onClick={() => compartilharEscala(escala.id_escala)}
                      />
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
