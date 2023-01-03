import generateSpinner from './spinner';

export default {
  title: 'Spinner/SpinnerComponent',
};

export const Default = () => generateSpinner({
  labels: ['Example 1', 'Example 2'],
});
