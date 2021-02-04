import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Content, Input, Text } from 'native-base';
import globalStyles from '../styles/styles';

const initialValues = {
  name: '',
  style: '',
  size: '',
  keywords: '',
};

const AddBikeFormSchema = Yup.object().shape({
  name: Yup.string().required('name is required').max(50),
  style: Yup.string().required('bike style is required').max(8),
  size: Yup.string().required('bike size is required'),
  keywords: Yup.string(),
});

// eslint-disable-next-line no-unused-vars
const handleSubmit = (values) => {
  console.log(values);
};

const AddBikeForm = ({ navigation }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={AddBikeFormSchema}
    onSubmit={(values) => console.log(values)}
  >
    {(formikProps) => (
      <Content>
        <Input
          placeholder="name"
          onChangeText={formikProps.handleChange('name')}
          value={formikProps.values.name}
          style={globalStyles.addBikeInput}
        />
        <Text>{ formikProps.touched.name && formikProps.errors.name }</Text>
        <Input
          placeholder="style"
          onChangeText={formikProps.handleChange('style')}
          value={formikProps.values.style}
          style={globalStyles.addBikeInput}
        />
        <Input
          placeholder="size"
          onChangeText={formikProps.handleChange('size')}
          value={formikProps.values.nasizeme}
          style={globalStyles.addBikeInput}
        />
        <Input
          placeholder="keywords"
          onChangeText={formikProps.handleChange('keywords')}
          value={formikProps.values.keywords}
          style={globalStyles.addBikeInput}
        />
        <Button
          onPress={formikProps.handleSubmit}
          style={globalStyles.addBikeButton}
        >
          <Text>Continue</Text>
        </Button>
      </Content>
    )}
  </Formik>
);

AddBikeForm.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddBikeForm;
