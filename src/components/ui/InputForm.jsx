// Componentes
import { Paragraph } from "../typrography/Paragraph";

export function InputForm({ quest, placehold, tipo, onFocus, onChange, id, name, value }) {
    return (
        <div className="flex flex-col items-start justify-between w-full">
            <Paragraph size="small" color="white" className="max-w-max leading-tight">{quest}:</Paragraph>
            <div className="flex items-start justify-start w-full h-full border border-white rounded-lg">
                <input
                    type={tipo}
                    id={id}
                    name={name}
                    placeholder={placehold}
                    className="bg-transparent text-white w-full focus:outline-none p-6"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus} // Adiciona a função de onFocus aqui
                />
            </div>
        </div>
    );
}
