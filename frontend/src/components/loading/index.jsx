import { Spinner} from '@phosphor-icons/react';
import './index.css';

export function Loading() {
    return (
        <div className='fundoLoading'>
            <Spinner color='#C975F4' size={16} />
        </div>
    )
}