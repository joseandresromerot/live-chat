import classes from './transparent-button.module.css';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

interface TransparentButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className: string
}

const TransparentButton = ({ className, ...rest }: TransparentButtonProps) => {
  return (
    <button {...rest} className={`${classes.button} ${className} ${quicksand.className}`} />
  );
}

TransparentButton.defaultProps = {
  className: ""
};

export default TransparentButton;