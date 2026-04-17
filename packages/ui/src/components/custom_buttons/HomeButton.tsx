import { useNavigate } from 'react-router';
import { ButtonsClass } from '../*utils/styles';
import { HomeIcon } from '@repo/icons';

export function HomeButton() {
  const navigate = useNavigate();
  return <HomeIcon className={ButtonsClass} size={18} onClick={() => navigate('/')}></HomeIcon>;
}
