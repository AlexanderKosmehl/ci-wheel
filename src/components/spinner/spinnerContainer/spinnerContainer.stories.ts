import generateSpinnerComponent from './spinnerContainer';

export default {
  title: 'Spinner/SpinnerContainer',
};

export const Default = () => generateSpinnerComponent({
  labels: ['Example 1', 'Example 2'],
  spinCallback: () => {},
});
