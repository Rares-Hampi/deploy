import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Wrapper from "../components/Wraper";
import logo from "../../public/logo.png";
import { getAnswer, searchQuest } from "../Request/Api";
import Alert from "../components/Modal";
import { useEffect, useState } from "react";
import Faq from "../components/Faq";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [why, setWhy] = useState<string>("");
  const [txt, setTxt] = useState<string>("");
  const location = useLocation();

  const handleSubmit = async (text: string) => {
    const answers = await getAnswer(text);
    if (
      answers === "Sorry, I did not understand your question. Please try again."
    ) {
      const ans = await searchQuest(text);
      const randomAnswers = ans
        .sort(() => Math.random() - Math.random())
        .slice(0, 10);
      setAnswers(randomAnswers);
      setWhy("intrebari");
    } else {
      setWhy("raspuns");
      setAnswers(answers);
    }
    setTxt(location.state?.copied || "");
    setShow(true);
  };

  useEffect(() => {
    setTxt(location.state?.copied || "");
  }, [location.state?.copied]);

  return (
    <Wrapper>
      <Container className="d-flex flex-column justify-content-center align-items-center customSize rounded-5">
        <Link to="/" className="align-self-start">
          <BiArrowBack className="align-self-start fs-2 ms-3" />
        </Link>
        <h1 className="mb-5 textWh7">Chat</h1>

        <Container>
          <Faq />
        </Container>
        <img src={logo} alt="logo" />
        {show ? <Alert answers={answers} appear={show} reason={why} /> : null}

        <Formik
          initialValues={{
            text: txt,
          }}
          validationSchema={Yup.object({
            text: Yup.string().max(255).required("Text is required"),
          })}
          onSubmit={(values) => {
            if (values.text !== "" || txt !== "") {
              handleSubmit(values.text || txt);
              setShow(false);
              setTxt("");
              values.text = "";
              localStorage.removeItem("copied");
              location.state.copied = "";
            } else {
              alert("Please enter a question");
            }
          }}
        >
          {(formik) => (
            <Form
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              className="d-flex flex-column align-self-center align-items-center"
            >
              <div className="border-bottom border-black wrapp mb-2">
                <Field
                  placeholder="What is your question?"
                  name="text"
                  type="text"
                  className="border-0 bg-white text-black input p-2"
                  value={formik.values.text || txt}
                />
              </div>
              <ErrorMessage
                name="text"
                component="h5"
                className=" text-danger"
              />

              <Button
                className="button mt-5 mb-3 rounded-5"
                onClick={() => {
                  if (formik.values.text !== "" || txt !== "") {
                    handleSubmit(formik.values.text || txt);
                    setShow(false);
                    setTxt("");
                    formik.values.text = "";
                    localStorage.removeItem("copied");
                    location.state.copied = "";
                  } else {
                    alert("Please enter a question");
                  }
                }}
              >
                Ask
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
};

export default Chat;
