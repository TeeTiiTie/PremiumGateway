import React from "react";
import PropTypes from "prop-types";
import { Autocomplete } from "@material-ui/lab";
import { CircularProgress, TextField } from "@material-ui/core";

/**
 * @param {object} props
 * ตั้งค่า props ที่จะใช้งาน
 *
 * @param {object} props.formik
 * state ของ formik ที่จะใช้
 *
 * @param {string} props.name
 * ชื่อของ field ที่จะใช้
 * ต้องตรงกับชื่อของ field ใน state ของ formik
 *
 * @param {string} props.label
 * ชื่อของ label ที่จะใช้
 *
 * @param {array} props.options
 * array ของข้อมูลที่จะใช้ในการแสดงผล
 *
 * @param {string} props.valueFieldName
 * ชื่อของ field ใน array options
 * ที่จะใช้เป็นค่า เช่น id
 *
 * @param {string} props.displayFieldName
 * ชื่อของ field ใน array options
 * ที่จะใช้เป็นแสดงผลข้อความ เช่น name
 *
 * @param {boolean} props.disabled
 * ปิดการใช้งาน
 *
 * @param {array} props.defaultValue
 * ค่าเริ่มต้น
 * ต้องเป็น object ที่มีค่าเป็น {valueFieldName: value, displayFieldName: value}
 * เช่น {id: 1, name: "test"}
 *
 * @param {string} props.variant
 * รูปแบบกล่องข้อความ
 * ปกติจะใช้ "outlined" | "filled" | "standard"
 *
 * @param {string} props.placeholder
 * ข้อความ ที่จะแสดงเมื่อไม่มีข้อมูล
 * 
 * @param {func} props.selectCallback
 * ฟังก์ชันที่จะทำงานเมื่อมีการเลือกข้อมูล
 */
const FormikSelectTo = (props) => {
  // ตั้งค่า props ที่จะใช้ ใน component Autocomplete
  let autocompleteProps = {
    disabled: props.disabled,
    loadingText: "กำลังค้นหา...",
    value: props.formik.values[`${props.name}`],
    options: props.options,
    noOptionsText: "ไม่พบข้อมูล",
    getOptionLabel: (option) => option[`${props.displayFieldName}`],
    onChange: (event, value) => {
      if (value) {
        props.formik.setFieldValue(props.name, {
          [props.valueFieldName]: value[props.valueFieldName],
          [props.displayFieldName]: value[props.displayFieldName],
        });
        props.selectCallback(value);
      } else {
        props.formik.setFieldValue(props.name, null);
        props.selectCallback(null);
      }
    },
    getOptionSelected: (option, value) =>
      option[props.valueFieldName] === value[props.valueFieldName],
  };

  // ตั้งค่า props ที่จะใช้ ใน component TextField
  const textFieldProps = {
    name: props.name,
    label: props.label,
    variant: "outlined",
    fullWidth: true,
    disabled: props.disabled,
    error: props.formik.errors[`${props.name}`] ? true : false,
    helperText: props.formik.errors[`${props.name}`]
      ? props.formik.errors[`${props.name}`]
      : "",
    onBlur: () => {
      props.formik.setFieldTouched([`${props.name}`], true, true);
    },
    value: props.formik.values[`${props.name}`],
    placeholder: props.placeholder,
  };

  // ถ้าข้อมูลที่ส่งมาเป็น null หรือ ว่างตั้งค่า loading เป็น true
  if (props.options === null || props.options.length === 0) {
    return <CircularProgress />;
  }

  return (
    <Autocomplete
      {...autocompleteProps}
      renderInput={(params) => <TextField {...params} {...textFieldProps} />}
    />
  );
};

FormikSelectTo.propTypes = {
  /**
   * state ของ formik ที่จะใช้
   */
  formik: PropTypes.object.isRequired,
  /**
   * ชื่อของ field ที่จะใช้
   * ต้องตรงกับชื่อของ field ใน state ของ formik
   */
  name: PropTypes.string.isRequired,
  /**
   * ชื่อของ label ที่จะแสดง
   */
  label: PropTypes.string.isRequired,
  /**
   * array ของข้อมูลที่จะใช้ในการแสดงผล
   */
  options: PropTypes.array.isRequired,
  /**
   * ชื่อของ field ใน array options
   * ที่จะใช้เป็นค่า เช่น id
   */
  valueFieldName: PropTypes.string.isRequired,
  /**
   * ชื่อของ field ใน array options
   * ที่จะใช้เป็นแสดงผลข้อความ เช่น name
   */
  displayFieldName: PropTypes.string.isRequired,
  /**
   * ปิดการใช้งาน
   */
  disabled: PropTypes.bool,
  /**
   * ค่าเริ่มต้น
   * ต้องเป็น object ที่มีค่าเป็น {valueFieldName: value, displayFieldName: value}
   * เช่น {id: 1, name: "test"}
   */
  defaultValue: PropTypes.object,
  /**
   * รูปแบบกล่องข้อความ
   * ปกติจะใช้ "outlined" | "filled" | "standard"
   */
  variant: PropTypes.string,
  /**
   * ข้อความ ที่จะแสดงเมื่อไม่มีข้อมูล
   */
  placeholder: PropTypes.string,
  /**
   * ข้อความ ที่จะแสดงเมื่อกำลังโหลดข้อมูล
   */
  selectCallback: PropTypes.func,
};

FormikSelectTo.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  options: [{ id: 0, name: "Do not forget to set data" }],
  valueFieldName: "id",
  displayFieldName: "name",
  disabled: false,
  defaultValue: null,
  variant: "outlined",
  placeholder: "กรุณาเลือก...",
  selectCallback: () => {},
};
export default FormikSelectTo;
