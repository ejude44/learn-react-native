import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import Input from '../Input/Input';
import { useState } from 'react';
import Button from '../ui/Button';
import CameraButton from '../ui/CameraButton';
import LocationButton from '../ui/LocationButton';
import { validateInput } from '../../utils/validateInput';
import { isDefined } from '../../utils/isDefined';
import { GlobalStyles } from '../../constants/styles';
import { ExpenseData } from '../../model/expenses.model';
import { formatDateToInput } from '../../utils/formatDateToInput';

interface LocationData {
  latitude: number;
  longitude: number;
  locationName?: string;
}

interface InputValue {
  amount: string;
  date: string;
  description: string;
  receiptImage?: string;
  location?: LocationData;
}

interface Props {
  onCancel: () => void;
  submitButtonLabel: string;
  onSubmit: (_expense: ExpenseData) => void;
  defaultValues?: ExpenseData;
}

function ExpenseForm({
  onCancel,
  submitButtonLabel,
  onSubmit,
  defaultValues,
}: Props) {
  const [inputValue, setInputValue] = useState<InputValue>({
    amount: isDefined(defaultValues) ? defaultValues.amount.toString() : '',
    date: isDefined(defaultValues) ? formatDateToInput(defaultValues.date) : '',
    description: isDefined(defaultValues) ? defaultValues.description : '',
    receiptImage: defaultValues?.receiptImage || undefined,
    location:
      defaultValues?.latitude && defaultValues?.longitude
        ? {
            latitude: defaultValues.latitude,
            longitude: defaultValues.longitude,
            locationName: defaultValues.locationName,
          }
        : undefined,
  });

  const [formError, setFormError] = useState<string>('');

  function inputChangedHandler(
    inputIdentifier: keyof InputValue,
    enteredValue: string
  ) {
    setInputValue((prevState) => ({
      ...prevState,
      [inputIdentifier]: enteredValue,
    }));
  }

  function handleImageSelected(imageUri: string) {
    setInputValue((prevState) => ({
      ...prevState,
      receiptImage: imageUri,
    }));
  }

  function handleLocationSelected(location: LocationData) {
    setInputValue((prevState) => ({
      ...prevState,
      location,
    }));
  }

  function submitHandler() {
    const expenseData: ExpenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
      receiptImage: inputValue.receiptImage,
      latitude: inputValue.location?.latitude,
      longitude: inputValue.location?.longitude,
      locationName: inputValue.location?.locationName,
    };

    const { isValid, error } = validateInput(expenseData);

    if (isValid && expenseData) {
      onSubmit(expenseData);
      setFormError('');
    } else {
      setFormError(error);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>

        <View style={styles.inputRow}>
          <Input
            style={styles.rowInput}
            label={'Amount'}
            keyBoardType={'decimal-pad'}
            textInputConfig={{
              onChangeText: (value: string) =>
                inputChangedHandler('amount', value),
              value: inputValue.amount,
            }}
          />
          <Input
            style={styles.rowInput}
            label={'Date'}
            keyBoardType={'default'}
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: (value: string) =>
                inputChangedHandler('date', value),
              value: inputValue.date,
            }}
          />
        </View>

        <Input
          label={'Description'}
          keyBoardType={'default'}
          textInputConfig={{
            multiline: true,
            numberOfLines: 4,
            autoCorrect: false,
            autoCapitalize: 'sentences',
            onChangeText: (value: string) =>
              inputChangedHandler('description', value),
            value: inputValue.description,
          }}
        />

        <CameraButton onImageSelected={handleImageSelected} />
        <LocationButton
          onLocationSelected={handleLocationSelected}
          currentLocation={inputValue.location}
        />

        {inputValue.receiptImage && (
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>Receipt:</Text>
            <Image
              source={{ uri: inputValue.receiptImage }}
              style={styles.image}
            />
          </View>
        )}

        {inputValue.location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Location:</Text>
            <Text style={styles.locationText}>
              {inputValue.location.locationName ||
                `${inputValue.location.latitude.toFixed(4)}, ${inputValue.location.longitude.toFixed(4)}`}
            </Text>
          </View>
        )}

        <View style={styles.buttons}>
          <Button mode={'flat'} onPress={onCancel} style={styles.button}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
        </View>

        {<Text style={styles.errorText}>{formError}</Text>}
      </View>
    </ScrollView>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 5,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 8,
    textAlign: 'center',
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  imageLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  locationContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  locationLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  locationText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 14,
    textAlign: 'center',
  },
});
