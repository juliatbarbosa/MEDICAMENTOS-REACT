import './index.css';

export function BotaoIcone({icone, ...rest}) {
    return (
        <button {...rest}>
            {icone}
        </button>
    )
}