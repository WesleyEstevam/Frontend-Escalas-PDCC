import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  Select,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import axios from "axios";
import { baseURL } from "../api/api";

const CadastroEscalas = ({ onSalvarEscalas }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [escalas, setEscalas] = useState([]);
  const [nomesCoroinhas, setNomesCoroinhas] = useState([]);
  const [nomesObjetosLiturgicos, setNomesObjetosLiturgicos] = useState([]);
  const [nomesIgrejas, setNomesIgrejas] = useState([]); // Lista de nomes de igrejas
  const [horariosMissas, setHorariosMissas] = useState([]); // Lista de horários de missas

  useEffect(() => {
    const fetchNomesCoroinhas = async () => {
      try {
        const response = await axios.get(`${baseURL}coroinhas`);
        setNomesCoroinhas(response.data);
      } catch (error) {
        console.error("Erro ao buscar nomes dos coroinhas:", error);
      }
    };

    const fetchNomesObjetosLiturgicos = async () => {
      try {
        const response = await axios.get(`${baseURL}objetos`);
        setNomesObjetosLiturgicos(response.data);
      } catch (error) {
        console.error("Erro ao buscar nomes dos objetos litúrgicos:", error);
      }
    };

    // Função para buscar os nomes das igrejas
    const fetchNomesIgrejas = async () => {
      try {
        const response = await axios.get(`${baseURL}horarios`);
        setNomesIgrejas(response.data);
      } catch (error) {
        console.error("Erro ao buscar nomes das igrejas:", error);
      }
    };

    // Função para buscar os horários das missas
    const fetchHorariosMissas = async () => {
      try {
        const response = await axios.get(`${baseURL}horarios`);
        setHorariosMissas(response.data);
      } catch (error) {
        console.error("Erro ao buscar horários das missas:", error);
      }
    };

    fetchNomesCoroinhas();
    fetchNomesObjetosLiturgicos();
    fetchNomesIgrejas(); // Chamando a função para buscar os nomes das igrejas
    fetchHorariosMissas(); // Chamando a função para buscar os horários das missas
  }, []);

  const adicionarEscala = () => {
    setIsOpen(true),
      setEscalas([
        {
          nome_coroinha: "",
          objeto_liturgico: "",
        },
      ]);
  };

  const handleChange = (index, atributo, subindex, value) => {
    const novasEscalas = [...escalas];
    novasEscalas[index][atributo][subindex] = value;
    setEscalas(novasEscalas);
  };

  const handleSave = () => {
    onSalvarEscalas(escalas);
    setIsOpen(false);
  };

  return (
    <>
      <Button marginLeft="90%" colorScheme="blue" onClick={adicionarEscala}>
        Nova Escala
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Escalas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={8} marginTop="20px">
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Escala do dia</FormLabel>
                  <Input
                    type="date"
                    value={escalas.data_escala}
                    onChange={(e) =>
                      handleChange(0, "data_escala", 0, e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Horário da Missa</FormLabel>
                  <Select
                    value={escalas.horario_missa}
                    onChange={(e) =>
                      handleChange(0, "horario_missa", 0, e.target.value)
                    }
                  >
                    {horariosMissas.map((horario) => (
                      <option key={horario.id} value={horario.horario_missa}>
                        {horario.horario_missa}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {Object.entries(escalas).map(
                  ([atributo, lista]) =>
                    atributo !== "nome_capela" &&
                    atributo !== "horario_missa" &&
                    atributo !== "data_escala" && (
                      <div key={atributo}>
                        {Array.isArray(lista) &&
                          lista.map((item, subindex) => (
                            <FormControl key={subindex}>
                              <FormLabel>{atributo}</FormLabel>
                              <Select
                                value={item.nome_coroinha}
                                onChange={(e) =>
                                  handleChange(
                                    0,
                                    atributo,
                                    subindex,
                                    e.target.value
                                  )
                                }
                              >
                                {nomesCoroinhas.map((coroinha) => (
                                  <option
                                    key={coroinha.id}
                                    value={coroinha.nome}
                                  >
                                    {coroinha.nome}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          ))}
                      </div>
                    )
                )}
              </VStack>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Nome da Igreja</FormLabel>
                  <Select
                    value={escalas.nome_capela}
                    onChange={(e) =>
                      handleChange(0, "nome_capela", 0, e.target.value)
                    }
                  >
                    {nomesIgrejas.map((igreja) => (
                      <option key={igreja.id} value={igreja.nome_capela}>
                        {igreja.nome_capela}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Tipo de cerimonia</FormLabel>
                  <Input
                    type="text"
                    value={escalas.tipo_cerimonia}
                    onChange={(e) =>
                      handleChange(0, "tipo_cerimonia", 0, e.target.value)
                    }
                  />
                </FormControl>
                {Object.entries(escalas).map(
                  ([atributo, lista]) =>
                    atributo !== "nome_capela" &&
                    atributo !== "horario_missa" &&
                    atributo !== "data_escala" && (
                      <div key={atributo}>
                        {Array.isArray(lista) &&
                          lista.map((item, subindex) => (
                            <FormControl key={subindex}>
                              <FormLabel>{atributo}</FormLabel>
                              <Select
                                value={item.nome_objeto}
                                onChange={(e) =>
                                  handleChange(
                                    0,
                                    atributo,
                                    subindex,
                                    e.target.value
                                  )
                                }
                              >
                                {nomesObjetosLiturgicos.map((objeto) => (
                                  <option
                                    key={objeto.id}
                                    value={objeto.nome_objeto}
                                  >
                                    {objeto.nome_objeto}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          ))}
                      </div>
                    )
                )}
              </VStack>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Salvar
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

CadastroEscalas.propTypes = {
  onSalvarEscalas: PropTypes.func.isRequired,
};

export default CadastroEscalas;
