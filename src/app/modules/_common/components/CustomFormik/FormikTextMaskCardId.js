/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      id={`${props.name}-id-maskInput`}
      mask={[
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  name: PropTypes.string,
  inputRef: PropTypes.func.isRequired,
};

function FormikTextMaskCardId(props) {
  return (
    <FormControl
      fullWidth
      size={props.size}
      variant="outlined"
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
    >
      <InputLabel id={`${props.name}-id-label`} htmlFor={`${props.name}-id`}>
        {props.label}
      </InputLabel>
      <OutlinedInput
        value={props.formik.values[`${props.name}`]}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        name={props.name}
        id={`${props.name}-id`}
        disabled={props.disabled}
        required={props.required}
        inputProps={props}
        inputComponent={TextMaskCustom}
        label={props.label}
      />
      {props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] && (
          <FormHelperText>
            {props.formik.errors[`${props.name}`]}
          </FormHelperText>
        )}
    </FormControl>
  );
}

FormikTextMaskCardId.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
};

// Same approach for defaultProps too
FormikTextMaskCardId.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  required: false,
  size: "small",
};

export default FormikTextMaskCardId;
