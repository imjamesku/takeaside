import React, { useState, FormEvent } from "react";
import styles from "./CreateTopicForm.module.scss";
import { mutate } from "swr";
import { topicService } from "../../_services/topic_service";
import Topic from "../../_types/Topic";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface Props {}

const CreateTopicForm = (props: Props) => {
  const [formData, setFormData] = useState({
    question: "",
    left: "",
    right: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [alert, setAlert] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((inputs) => ({ ...inputs, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setAlert("");
    e.preventDefault();
    if (!executeRecaptcha) {
      window.alert("something went wrong");
      return;
    }
    const token = await executeRecaptcha("createTopic");
    topicService
      .createTopic(formData, token)
      .then(() => {
        setFormData({ question: "", left: "", right: "" });
        setAlert("Topic Created");
        location.reload();
      })
      .catch((error) => {
        setAlert("Failed to create the topic");
      });
  }
  return (
    <div className={styles.createTopic}>
      <h1>Create Topic</h1>
      {alert && <span className={styles.alert}>{alert}</span>}
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Question"
          required
        />
        <input
          type="text"
          name="left"
          placeholder="First Option"
          value={formData.left}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="right"
          placeholder="Second Option"
          value={formData.right}
          onChange={handleChange}
          required
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateTopicForm;
