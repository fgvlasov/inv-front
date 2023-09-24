import { FormProvider, useForm } from "react-hook-form";
import sendEmail from "lib/email";
import Image from "next/image";
import ModalLabel from "../ui/ModalLabel";
import ModalFieldset from "../ui/ModalFieldset";
import ButtonSubmit from "../ui/ButtonSubmit";
import ModalInputForBrief from "../ui/ModalInputForBrief";
import ModalSelectForBrief from "../Brief/ModalSelectForBrief";
import ModalApproveForm from "./ModalApproveForm";
import { useContext, useState } from "react";
import { ToastrContext } from "../Toastr/ToastrProvider";

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

export const FormOrder = ({ onSubmitForm }) => {
  const methods = useForm();
  const [loading, setLoading] = useState(false);
  const { setOpen, setSuccess, setMessage, Confirmation_Form_Zayavka } =
    useContext(ToastrContext);
  const openSuccessToast = () => {
    setMessage(Confirmation_Form_Zayavka);
    setSuccess(true);
    setOpen(true);
  };
  const openErrorToast = () => {
    setSuccess(false);
    setOpen(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await sendEmail(data);
      openSuccessToast();
    } catch (error) {
      openErrorToast();
    } finally {
      setLoading(false);
    }
    onSubmitForm();
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
        <h2 className="text-xl pb-1.5">Отправить заявку</h2>
        <p className="pb-15">
          Оставьте свои контактные данные и мы вышлем вам Коммерческое
          предложение
        </p>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalFieldset width="w-full">
              <ModalLabel
                htmlFor="Name"
                text="Имя"
                align="text-left"
                required={true}
              />
              <ModalInputForBrief
                type="text"
                id="Name"
                placeholder="Введите ваше имя"
                name="Name"
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

            <ModalFieldset width="w-full">
              <ModalLabel
                htmlFor="email"
                text="E-mail"
                align="text-left"
                required={false}
              />
              <ModalInputForBrief
                type="email"
                id="email"
                placeholder="Введите ваш e-mail"
                error={methods.formState.errors.email?.message}
                pattern={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                }}
                name="email"
                register={methods.register}
              />
            </ModalFieldset>

            <ModalFieldset width="w-full">
              <ModalLabel
                htmlFor="theme"
                text="Выберите направление"
                align="text-left"
                required={true}
              />
              <ModalSelectForBrief options={options} name={"Direction"} />
            </ModalFieldset>
            <ModalApproveForm name={"Agreement"} fullWidth />
            <ButtonSubmit fullWidth loading={loading} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
