import './index.css';

export function Botao({icone, titulo, variante="primary", ...rest}) {
    return (
        <button className={variante} {...rest}>
            {icone && (icone)}
            {titulo}
        </button>
    )
}