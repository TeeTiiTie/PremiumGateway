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
      mask={[
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/
      ]}
      placeholderChar={"\u2000"}
      showMask
      guide={false} //กำหนดให้cursorอยู่ตำแหน่งแรกเสมอ และ '-' จะแสดงเมื่อกรอกเบอร์ครบ
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function FormikTextMaskPhone(props) {
  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor={`${props.name}-id`}>{props.label}</InputLabel>
      <OutlinedInput
        value={props.formik.values[`${props.name}`]}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        name={props.name}
        id={`${props.name}-id`}
        disabled={props.disabled}
        required={props.required}
        inputComponent={TextMaskCustom}
        inputProps={{ inputMode: "numeric" }} //สำหรับแสดง แป้นพิมพ์บนมือถือ ("","numeric","none")
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

FormikTextMaskPhone.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

// Same approach for defaultProps too
FormikTextMaskPhone.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  required: false,
};

export default FormikTextMaskPhone;
