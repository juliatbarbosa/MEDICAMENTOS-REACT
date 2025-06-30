import './index.css';
import { X } from '@phosphor-icons/react';

export function Toast({ message, success = true, fecharToast }) {
    return (
        <div className='fundoToast'>
            <div className={`container ${success ? '' : 'error'}`}>
                {message}
                <button className='botaoFecharToast' onClick={fecharToast}>
                    <X color='#fff' size={16} />
                </button>
            </div>
        </div>
    );
}