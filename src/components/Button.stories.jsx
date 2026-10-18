
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'outline', 'chip', 'danger', 'glass'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    children: 'Meu botão',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};

export const Loading = {
  args: {
    children: 'Gerando treino...',
    loading: true,
  },
};

export const Disabled = {
  args: {
    children: 'Indisponível',
    disabled: true,
  },
};
