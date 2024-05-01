import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  HStack,
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

const CadastroEscalas = ({ onSalvarEscalas }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [escalas, setEscalas] = useState([]);

  const adicionarEscala = () => {
    setIsOpen(true),
      setEscalas([
        ...escalas,
        {
          nome_igreja: "",
          horario_missa: "",
          Turibulo: [{ nome_coroinha: "" }],
          Naveta: [{ nome_coroinha: "" }],
          "Castiçal 1": [{ nome_coroinha: "" }],
          "Castiçal 2": [{ nome_coroinha: "" }],
          Cruz: [{ nome_coroinha: "" }],
          Missal: [{ nome_coroinha: "" }],
        },
      ]);
  };

  const adicionarCampo = (index, atributo) => {
    const novasEscalas = [...escalas];
    novasEscalas[index][atributo].push({ nome_coroinha: "" });
    setEscalas(novasEscalas);
  };

  const handleChange = (index, atributo, subindex, value) => {
    const novasEscalas = [...escalas];
    // Se o atributo for "nome_igreja" ou "horario_missa",
    // definimos diretamente o valor no array principal
    if (atributo === "nome_igreja" || atributo === "horario_missa") {
      novasEscalas[index][atributo] = value;
    } else {
      // Caso contrário, atribuímos ao subitem correspondente
      novasEscalas[index][atributo][subindex].nome_coroinha = value;
    }
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Escalas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="center">
              {escalas.map((escala, index) => (
                <Grid
                  key={index}
                  templateColumns="repeat(2, 1fr)"
                  gap={8}
                  marginTop="20px"
                >
                  <FormControl>
                    <FormLabel>Nome da Igreja</FormLabel>
                    <Input
                      type="text"
                      value={escala.nome_igreja}
                      onChange={(e) =>
                        handleChange(index, "nome_igreja", 0, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Horário da Missa</FormLabel>
                    <Input
                      type="text"
                      value={escala.horario_missa}
                      onChange={(e) =>
                        handleChange(index, "horario_missa", 0, e.target.value)
                      }
                    />
                  </FormControl>
                  {Object.entries(escala).map(
                    ([atributo, lista]) =>
                      // Exclui o botão para Nome da Igreja e Horário da Missa
                      atributo !== "nome_igreja" &&
                      atributo !== "horario_missa" && (
                        <div key={atributo}>
                          {Array.isArray(lista) &&
                            lista.map((item, subindex) => (
                              <HStack key={subindex}>
                                <FormControl>
                                  <FormLabel>{atributo}</FormLabel>
                                  <Input
                                    type="text"
                                    value={item.nome_coroinha}
                                    onChange={(e) =>
                                      handleChange(
                                        index,
                                        atributo,
                                        subindex,
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormControl>
                                {/* Adicione o botão de adicionar ao lado do input */}
                                <Button
                                  onClick={() =>
                                    adicionarCampo(index, atributo)
                                  }
                                >
                                  +
                                </Button>
                              </HStack>
                            ))}
                        </div>
                      )
                  )}
                </Grid>
              ))}
            </VStack>
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
