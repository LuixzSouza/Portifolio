import { Heading } from "../typrography/Heading";
import { Paragraph } from "../typrography/Paragraph";

export function ContentVideo({video, tipo, titulo, data, tempo}) {
    return(
        <div className="w-full flex flex-col gap-6" >
            <div className="rounded-lg overflow-hidden w-full h-full " >
                <iframe src={video} className="w-full aspect-[16/9] object-cover" allow="autoplay"></iframe>
            </div>
            <div>
                <Paragraph size="tiny" className={"text-red-600 font-semibold"}>{tipo}</Paragraph>
                <Heading as="h5" size="tiny" color="white">{titulo}</Heading>
                <div>
                <Paragraph size="tiny" className={"text-white/60"}>{data} • {tempo} de video</Paragraph>
                </div>
            </div>
        </div>
    )
}