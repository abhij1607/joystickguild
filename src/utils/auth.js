export const handleFormChange = (e, setFormValues) => {
  const { name: key, value } = e.target;

  setFormValues((previousState) => ({ ...previousState, [key]: value }));
};
