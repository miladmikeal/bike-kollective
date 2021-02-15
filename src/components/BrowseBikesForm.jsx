import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Content, Input, Picker, Text, View } from 'native-base';
import Slider from '@react-native-community/slider';
import globalStyles from '../styles/styles';

const BrowseBikesFormSchema = Yup.object().shape({
  name: Yup.string().max(50),
  style: Yup.string().max(8),
  frame: Yup.string(),
  keywords: Yup.string(),
  distanceMi: Yup.number()
});

const BrowseBikesForm = ({ setModalVisible, filterValues, setFilterValues }) => {
  const initialValues = {
    name: filterValues.name,
    style: filterValues.style,
    frame: filterValues.frame,
    keywords: filterValues.keywords,
    distanceMi: filterValues.distanceMi
  };

  const handleSubmit = (values) => {
    setModalVisible(false);
    setFilterValues(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BrowseBikesFormSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Content>
          <Input
            placeholder='Name'
            onChangeText={formikProps.handleChange('name')}
            value={formikProps.values.name}
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
              selectedValue={formikProps.values.frame}
              onValueChange={formikProps.handleChange('frame')}
            >
              <Picker.Item label='Size' value='Size' />
              <Picker.Item label='Child' value='Child' />
              <Picker.Item label='Small' value='Small' />
              <Picker.Item label='Medium' value='Medium' />
              <Picker.Item label='Large' value='Large' />
              <Picker.Item label='XL' value='XL' />
            </Picker>
          </View>
          {(formikProps.touched.frame && formikProps.errors.frame) &&
            <Text style={globalStyles.addBikeErrorText}>
              {formikProps.errors.frame}
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
          <Text style={globalStyles.defaultWidth}>Search Radius: {formikProps.values.distanceMi} mi</Text>
          <Slider
            style={globalStyles.defaultWidth}
            minimumValue={1}
            maximumValue={75}
            value={formikProps.values.distanceMi}
            step={0.5}
            onValueChange={(dist) => formikProps.setFieldValue('distanceMi', dist)}
          />
          <Button
            onPress={formikProps.handleSubmit}
            style={globalStyles.addBikeButton}
          >
            <Text>Filter</Text>
          </Button>
          <Button
            onPress={() => setModalVisible(false)}
            style={globalStyles.cancelButton}
          >
            <Text>Cancel</Text>
          </Button>
        </Content>
      )}
    </Formik>
  );
};

BrowseBikesForm.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  setFilterValues: PropTypes.func.isRequired,
  filterValues: PropTypes.shape({
    name: PropTypes.string,
    style: PropTypes.string,
    frame: PropTypes.string,
    keywords: PropTypes.string,
    distanceMi: PropTypes.number
  }).isRequired
};

export default BrowseBikesForm;
