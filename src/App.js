import logo from "./logo.svg";
//import './App.css';
import api from "./services/api";
import { Form, Input, FormGroup, Label, Button, Collapse } from "reactstrap";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactLoading from "react-loading";

function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("selecionar");
  const [menopause, setMenopause] = useState("selecionar");
  const [tumorSize, setTumorSize] = useState("selecionar");
  const [invNodes, setInvNodes] = useState("selecionar");
  const [nodeCaps, setNodeCaps] = useState("selecionar");
  const [degMalig, setDegMalig] = useState("selecionar");
  const [breast, setBreast] = useState("selecionar");
  const [breastQuad, setBreastQuad] = useState("selecionar");
  const [irradiat, setIrradiat] = useState("selecionar");
  const [recurrence, setRecurrence] = useState("selecionar");
  const [response, setResponse] = useState(null);

  function toggle() {
    setOpen(!open);
  }

  async function enviar() {
    let menopauseAux = "";
    let breastAux = "";
    let breastQuadAux = "";
    let irradiatAux = "";
    let nodeCapsAux = "";
    let recurrenceAux = "";
    if (
      age === "selecionar" ||
      menopause === "selecionar" ||
      tumorSize === "selecionar" ||
      invNodes === "selecionar" ||
      nodeCaps === "selecionar" ||
      degMalig === "selecionar" ||
      breast === "selecionar" ||
      breastQuad === "selecionar" ||
      irradiat === "selecionar"
    ) {
      toast("Preencha todos os campos", {
        type: "error",
      });
    } else {
      switch (menopause) {
        case "depois de 40 anos":
          menopauseAux = "lt40";

          break;
        case "antes dos 40 anos":
          menopauseAux = "ge40";

          break;

        case "pré menopausa":
          menopauseAux = "premeno";

          break;

        default:
          break;
      }
      switch (breast) {
        case "Direita":
          breastAux = "right";

          break;
        case "Esquerda":
          breastAux = "left";

          break;

        default:
          break;
      }

      switch (irradiat) {
        case "Sim":
          irradiatAux = "yes";

          break;
        case "Não":
          irradiatAux = "no";

          break;

        default:
          break;
      }

      switch (recurrence) {
        case "Sim":
          recurrenceAux = "recurrence-events";

          break;
        case "Não":
          recurrenceAux = "no-recurrence-events";

          break;

        default:
          break;
      }

      switch (nodeCaps) {
        case "Sim":
          nodeCapsAux = "yes";

          break;
        case "Não":
          nodeCapsAux = "no";

          break;

        default:
          break;
      }
      switch (breastQuad) {
        case "esquerda-superior":
          breastQuadAux = "left_up";

          break;
        case "esquerda-inferior":
          breastQuadAux = "left_low";

          break;

        case "direita-superior":
          breastQuadAux = "right_up";

          break;
        case "direita-inferior":
          breastQuadAux = "right_low";

          break;
        case "centro":
          breastQuadAux = "central";

          break;

        default:
          break;
      }
      setLoading(true);
      try {
        const response = await api.post(`/userAttributes`, {
          age,
          menopause: menopauseAux,
          tumor_size: tumorSize,
          inv_nodes: invNodes,
          node_caps: nodeCapsAux,
          deg_malig: degMalig,
          breast: breastAux,
          breast_quad: breastQuadAux,
          irradiat: irradiatAux,
          //classResult: recurrenceAux,
        });
        setResponse(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast(error, {
          type: "error",
        });
      }
    }
  }

  function novaConsulta() {
    setResponse(false);
    setAge("selecionar");
    setMenopause("selecionar");
    setTumorSize("selecionar");
    setInvNodes("selecionar");
    setNodeCaps("selecionar");
    setDegMalig("selecionar");
    setBreast("selecionar");
    setBreastQuad("selecionar");
    setIrradiat("selecionar");
  }
  return (
    <div
      style={{
        backgroundColor: "#BFBEC4",
        width: "100%",
        height: "100%",
        flex: 1,
        position: "absolute",
      }}
    >
      <ToastContainer />

      {response ? (
        <div class="container-fluid bg-light text-dark p-5">
          <div class="container bg-light p-5">
            <h1 class="display-4 fw-bold">Resultados encontrados</h1>
            <p>
              Probabilidade de não haver recorrência:{" "}
              {`${response.pNR.toFixed(2) * 100}%`}
            </p>
            <p>
              Probabilidade de haver recorrência:{" "}
              {`${response.pR.toFixed(2) * 100}%`}
            </p>
            {/* <p>
              Precisão de instâncias incorretas:{" "}
              {`${response.pI.toFixed(2) * 100}%`}
            </p>
            <p>
              Precisão de instâncias corretas:{" "}
              {`${response.pC.toFixed(2) * 100}%`}
            </p> */}
            <Button
              color="primary"
              onClick={() => novaConsulta()}
              style={{ marginBottom: "1rem" }}
            >
              Nova consulta
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#BFBEC4", width: "100%", height: "100%" }}
        >
          <div class="container-fluid bg-light text-dark p-5">
            <div class="container bg-light p-5">
              <h1 class="display-4 fw-bold">Bem vindo ao SISPRED</h1>

              <p>
                Sistema de auxilio de predição de recorrência de câncer de mama.
              </p>
              <p>Insira os dados necessários e obtenha as informações.</p>
              <Button
                color="primary"
                onClick={() => toggle()}
                style={{ marginBottom: "1rem" }}
              >
                Iniciar
              </Button>
              <Collapse isOpen={open}>
                <Form>
                  <FormGroup>
                    <Label for="exampleSelect">
                      Idade do paciente no momento que foi diagnosticado
                    </Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setAge(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>10-19</option>
                      <option>20-29</option>
                      <option>30-39</option>
                      <option>40-49</option>
                      <option>50-59</option>
                      <option>60-69</option>
                      <option>70-79</option>
                      <option>80-89</option>
                      <option>90-99</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">
                      Estado de menopausa do paciente
                    </Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setMenopause(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>depois de 40 anos</option>
                      <option>antes dos 40 anos</option>
                      <option>pré menopausa</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">
                      Tamanho do tumor em milímetros
                    </Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setTumorSize(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>0-4</option>
                      <option>5-9</option>
                      <option>10-14</option>
                      <option>15-19</option>
                      <option>20-24</option>
                      <option>25-29</option>
                      <option>30-34</option>
                      <option>35-39</option>
                      <option>40-44</option>
                      <option>45-49</option>
                      <option>50-54</option>
                      <option>55-59</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">
                      Linfonodos axilares que se mostraram corrompidos no
                      momento do exame
                    </Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setInvNodes(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">
                      Houve a penetração do tumor na cápsula do linfonodo?
                    </Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setNodeCaps(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">Grau histológico do tumor</Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setDegMalig(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">Qual mama foi afetada</Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setBreast(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>Direita</option>
                      <option>Esquerda</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">Quadrante da mama</Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setBreastQuad(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>esquerda-superior</option>
                      <option>esquerda-inferior</option>
                      <option>direita-superior</option>
                      <option>direita-inferior</option>
                      <option>centro</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">Se houve a radioterapia</Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setIrradiat(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </Input>
                  </FormGroup>
                  {/* <FormGroup>
                    <Label for="exampleSelect">
                      Se houve ou não recorrência
                    </Label>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => setRecurrence(e.target.value)}
                    >
                      <option>selecionar</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </Input>
                  </FormGroup> */}
                  {loading ? (
                    <div style={{ paddingLeft: 15 }}>
                      <ReactLoading type="spin" width={25} color={"blue"} />
                    </div>
                  ) : (
                    <Button
                      disabled={loading}
                      color="primary"
                      onClick={() => enviar()}
                      style={{ marginBottom: "1rem" }}
                    >
                      Enviar
                    </Button>
                  )}
                </Form>
              </Collapse>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
