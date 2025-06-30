import './index.css';

export function Input(props) {
    return (
        <div className='divinput'>
            {props.icone && (props.icone)}
            <input {...props} />
        </div>
    )
}