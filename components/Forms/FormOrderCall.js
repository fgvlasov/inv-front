import { FormProvider, useForm } from "react-hook-form";
import sendEmail from "lib/email";
import Image from "next/image";
import ModalLabel from "../ui/ModalLabel";
import ModalFieldset from "../ui/ModalFieldset";
import ButtonSubmit from "../ui/ButtonSubmit";
import ModalInputForBrief from "../ui/ModalInputForBrief";
import ModalSelectForBrief from "../Brief/ModalSelectForBrief";
import ModalApproveForm from "./ModalApproveForm";
import { useState } from "react";

const options = [
  {
    attributes: { Title: "Архитектурная 3D визуализация" },
  },
  {
    attributes: { Title: "Продуктовая 3D визуализация" },
  },
  {
    attributes: { Title: "Моушн & Видеопродакшн" },
  },
  {
    attributes: { Title: "3D моделирование" },
  },
];

export const FormOrderCall = ({ title }) => {
  const [checked, setChecked] = useState(true);
  const toggleChecked = () => setChecked((prev) => !prev);
  const methods = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await sendEmail(data);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Email sending error:", error);
    }
  };

  return (
    <div>
      <Image
        className="w-full bg-black min-h-[202px] object-cover rounded-t-5xl"
        src="/image/content/modal.png"
        width="398"
        height="202"
        alt=""
      />
      <div className="px-10 pb-15 pt-9 text-center">
        <h2 className="text-xl pb-1.5">Заказать звонок</h2>
        <p className="pb-15">{title}</p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalFieldset width="w-full">
              <ModalLabel
                htmlFor="name"
                text="Имя"
                align="text-left"
                required={true}
              />
              <ModalInputForBrief
                type="text"
                id="name"
                placeholder="Введите ваше имя"
                name={"name"}
                error={methods.formState.errors.name?.message}
                pattern={{ required: "This field is required" }}
                register={methods.register}
              />
            </ModalFieldset>

            <ModalFieldset width="w-full">
              <ModalLabel
                htmlFor="phone"
                text="Телефон"
                align="text-left"
                required={true}
              />
              <ModalInputForBrief
                type="tel"
                id="phone"
                placeholder="+7 (000) 000 00-00"
                error={methods.formState.errors.phone?.message}
                name={"phone"}
                pattern={{ required: "Phone is required" }}
                register={methods.register}
              />
            </ModalFieldset>

            <ModalApproveForm name={"approve"} fullWidth />
            <ButtonSubmit
              disabled={!checked && methods.formState.isValid}
              fullWidth
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};