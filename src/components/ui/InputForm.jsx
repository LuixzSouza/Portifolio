// Componentes
import { Heading } from "../typrography/Heading";

export function InputForm({ quest, placehold, tipo, onFocus, onChange }) {
    return (
        <div className="flex items-center justify-between w-full">
            <Heading as="h4" size="small" color="white" className="max-w-max leading-tight">{quest}</Heading>
            <div className="w-full h-full border-b border-white pt-6 ml-8">
                <input
                    type={tipo}
                    placeholder={placehold}
                    className="bg-transparent ml-5 text-white w-full focus:outline-none"
                    onChange={onChange}
                    onFocus={onFocus} // Adiciona a função de onFocus aqui
                />
            </div>
        </div>
    );
}
