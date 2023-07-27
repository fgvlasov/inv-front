export default function ModalLabel({htmlFor, text, required}) {
  return (
    <label className='pb-2 text-fiord text-sl' htmlFor={htmlFor}>
      {text}
      {required&&<span className="text-mandy ml-1.5">*</span>}
    </label>
  );
}
