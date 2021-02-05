import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Content, Input, Picker, Text, View } from 'native-base';
import globalStyles from '../styles/styles';

const initialValues = {
  name: '',
  style: '',
  size: '',
  keywords: '',
};

const AddBikeFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(50),
  style: Yup.string().required('Style is required').max(8),
  size: Yup.string().required('Size is required').test(
    'is not prompt',
    'Size is required',
    (value) => value !== 'Size'
  ),
  keywords: Yup.string(),
  lock: Yup.number().required('Lock combination is required').test(
    'is greater than zero',
    'Lock combination must be greater than zero',
    (value) => value > 0
  )
});

const AddBikeForm = ({ navigation }) => {

  const handleSubmit = (values) => navigation.push('AddBikeWaiver', { values: { values } });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddBikeFormSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Content>
          <Input
            placeholder='Name'
            onChangeText={formikProps.handleChange('name')}
            style={globalStyles.addBikeInput}
          />
          {(formikProps.touched.name && formikProps.errors.name) &&
            <Text style={globalStyles.addBikeErrorText}>
              {formikProps.errors.name}
            </Text>
          }
          <Input
            placeholder='Style'
            onChangeText={formikProps.handleChange('style')}
            value={formikProps.values.style}
            style={globalStyles.addBikeInput}
          />
          {(formikProps.touched.style && formikProps.errors.style) &&
            <Text style={globalStyles.addBikeErrorText}>
              {formikProps.errors.style}
            </Text>
          }
          <View style={globalStyles.addBikePickerView}>
            <Picker
              note
              mode="dropdown"
              style={globalStyles.addBikePicker}
              placeholder='Size'
              selectedValue={formikProps.values.size}
              onValueChange={formikProps.handleChange('size')}
            >
              <Picker.Item label='Size' value='Size' />
              <Picker.Item label='Child' value='Child' />
              <Picker.Item label='Small' value='Small' />
              <Picker.Item label='Medium' value='Medium' />
              <Picker.Item label='Large' value='Large' />
              <Picker.Item label='XL' value='XL' />
            </Picker>
          </View>
          {(formikProps.touched.size && formikProps.errors.size) &&
            <Text style={globalStyles.addBikeErrorText}>
              {formikProps.errors.size}
            </Text>
          }
          <Input
            placeholder='keywords (must be comma seperated)'
            onChangeText={formikProps.handleChange('keywords')}
            value={formikProps.values.keywords}
            style={globalStyles.addBikeInput}
          />
          {(formikProps.touched.keywords && formikProps.errors.keywords) &&
            <Text style={globalStyles.addBikeErrorText}>
              {formikProps.errors.keywords}
            </Text>
          }
          <Input
            placeholder='Lock Combination'
            onChangeText={formikProps.handleChange('lock')}
            value={formikProps.values.lock}
            style={globalStyles.addBikeInput}
            keyboardType='numeric'
          />
          {(formikProps.touched.lock && formikProps.errors.lock) &&
            <Text style={globalStyles.addBikeErrorText}>
              {formikProps.errors.lock}
            </Text>
          }
          <Button
            onPress={formikProps.handleSubmit}
            style={globalStyles.addBikeButton}
          >
            <Text>Continue</Text>
          </Button>
        </Content>
      )}
    </Formik>
  )
};

AddBikeForm.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddBikeForm;



/*
        <Input
          placeholder='size'
          onChangeText={formikProps.handleChange('size')}
          value={formikProps.values.size}
          style={globalStyles.addBikeInput}
        />
        {(formikProps.touched.size && formikProps.errors.size) &&
          <Text style={globalStyles.addBikeErrorText}>
            {formikProps.errors.size}
          </Text>
        }
*/