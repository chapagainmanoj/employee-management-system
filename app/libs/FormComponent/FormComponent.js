import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import DatePicker from "react-datepicker";
import { formatDate } from "../misc";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-datepicker/dist/react-datepicker.min.css";
import styles from "./FormComponent.css";

export function Form({
  form,
  validation,
  defaults,
  onSubmit,
  actions,
  formClass,
  fields,
  children,
  resolver,
  extraError,
  fieldUpdater,
  ...other
}) {
  const methods =
    form ||
    useForm({
      mode: "onBlur",
      defaultValues: defaults,
      resolver: validation && yupResolver(validation),
    });
  const { handleSubmit, setError, register } = methods;

  useEffect(() => {
    if (fields) {
      let hiddenFields = fields
        .filter((f) => f.name && !f.type)
        .forEach((field) => {
          register({ name: field.name });
        });
    }
  }, []);

  useEffect(() => {
    if (fieldUpdater && fieldUpdater.name && fieldUpdater.value) {
      methods.setValue(fieldUpdater.name, fieldUpdater.value);
    }
  }, [fieldUpdater]);

  useEffect(() => {
    extraError && setError(extraError);
  }, [extraError]);

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={["ui form", formClass].filter(Boolean).join(" ")}
        >
          {fields &&
            fields.map((field) => {
              if (Array.isArray(field)) {
                return (
                  <div className="equal width fields">
                    {field.map((f) => (
                      <Field
                        key={f.name}
                        {...f}
                        value={defaults && defaults[f.name]}
                      />
                    ))}
                  </div>
                );
              } else {
                return <Field key={field.name} {...field} />;
              }
            })}
          {children}
          {actions &&
            actions.map((action) => (
              <Action key={action.type || action.label} {...action} />
            ))}
        </form>
      </FormProvider>
    </React.Fragment>
  );
}

const Field = (props) => {
  switch (props.type) {
    case "select":
      return <Select {...props} />;
    case "password":
      return <Input {...props} type="password" />;
    case "text":
      return <Input {...props} />;
    case "number":
      return <Input {...props} type="number" />;
    case "radio":
      return <Radio {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "textarea":
      return <TextArea {...props} />;
    case "date":
      return <DateTime {...props} />;
    case "file":
      return <File {...props} />;
    case "daterange":
      return <DateRange {...props} />;

    default:
      return (
        <div className="ui error message">
          <p>Invalid field.</p>
        </div>
      );
  }
};

const Action = (props) => {
  const { type, buttonClass, label, icon, onClick, loading } = props;
  const { handleSubmit, reset } = useFormContext();
  let loadingClass = loading && "loading";

  const handleReset = useCallback((e) => {
    e.preventDefault();
    reset();
    onClick && handleSubmit(onClick)();
  });

  switch (type) {
    case "submit":
      return (
        <button
          className={["ui button primary", buttonClass, loadingClass]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {icon && <i className={`icon ${icon}`} />} {label || "Submit"}
        </button>
      );
    case "reset":
      return (
        <div
          className={["ui button", buttonClass, loadingClass]
            .filter(Boolean)
            .join(" ")}
          {...props}
          onClick={handleReset}
        >
          {icon && <i className={`icon ${icon}`} />} {label || "Reset"}
        </div>
      );
    case "neutral":
      return (
        <div
          className={["ui button", buttonClass, loadingClass]
            .filter(Boolean)
            .join(" ")}
          {...props}
          onClick={onClick}
        >
          {icon && <i className={`icon ${icon}`} />} {label || "Submit"}
        </div>
      );
    default:
      return (
        <div
          className={["ui button", buttonClass, loadingClass]
            .filter(Boolean)
            .join(" ")}
          {...props}
          onClick={handleSubmit(onClick)}
        >
          {icon && <i className={`icon ${icon}`} />} {label || "Submit"}
        </div>
      );
  }
};

export function Input({ label, placeholder, icon, name, ...rest }) {
  // BUG: name: search is not working
  const { register, errors } = useFormContext();
  if (icon) {
    return (
      <div className="field">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="ui icon input">
          <input
            name={name}
            placeholder={placeholder}
            ref={register}
            {...rest}
          />
          {icon && <i className={`icon ${icon}`} />}
        </div>
        {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
      </div>
    );
  }
  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <input name={name} placeholder={placeholder} ref={register} {...rest} />
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
}

export function TextArea({ label, placeholder, name, ...rest }) {
  const { register, errors } = useFormContext();
  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        ref={register}
        {...rest}
      />
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
}

export function Checkbox({ label, type, uiClass, name, ...rest }) {
  const { register, errors } = useFormContext();
  return (
    <div className="field">
      <div className={`ui ${type || ""} checkbox ${uiClass}`}>
        <input name={name} type="checkbox" ref={register} {...rest} />
        {label && <label>{label}</label>}
        {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
      </div>
    </div>
  );
}

export function File({
  label,
  type,
  uiClass,
  placeholder,
  fieldClass,
  name,
  multiple,
  ...rest
}) {
  const [fileName, setFileName] = useState("");
  const inputFile = useRef(null);
  const {
    register,
    errors,
    setValue,
    unregister,
    getValues,
  } = useFormContext();
  useEffect(() => {
    register({ name: name });
    let value = getValues(name);
    if (!value) setFileName("");
    return () => unregister(name);
  }, [register]);

  const handleChange = (e) => {
    if (multiple) {
      setValue(name, e.target.files);
    } else {
      let file = e.target.files[0];
      setValue(name, file);
      setFileName(file.name);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <div className={`field ${fieldClass}`}>
      {label && <label>{label}</label>}
      <div onClick={onButtonClick} className={`ui action input ${uiClass}`}>
        <input
          type="text"
          value={fileName}
          placeholder={placeholder || "Choose File"}
          readonly=""
        />
        <input
          ref={inputFile}
          onChange={handleChange}
          style={{ display: "none" }}
          type="file"
        />
        <div onClick={onButtonClick} className="ui icon button">
          <i className="attach icon"></i>
        </div>
      </div>
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
}

export function Radio({ label, name, ...rest }) {
  const { register, errors } = useFormContext();
  return (
    <div className="field">
      <div className="ui radio checkbox">
        <input name={name} type="radio" ref={register} {...rest} />
        {label && <label>{label}</label>}
      </div>
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
}

export function Select({
  label,
  uiClass,
  loading,
  value,
  placeholder,
  options,
  name,
  ...rest
}) {
  const { register, unregister, errors, setValue, watch } = useFormContext();

  const handleOnChange = (value, text) => {
    if (!options) return;
    if (value) {
      setValue(name, options[value].value || options[value].idx, true);
    } else {
      setValue(name, undefined);
    }
  };

  useEffect(() => {
    register({ name: name });
    return () => unregister(name);
  }, [register]);

  useEffect(() => {
    if (!options) return;
    let value = watch(name);
    if (value) {
      let item = options.find((i) => i.idx === value || i.value === value);
    }
  }, [watch(name), options]);

  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        className={`ui ${uiClass || ""} dropdown ${loading ? "loading" : ""}`}
        {...rest}
        name={name}
        ref={register}
      >
        <React.Fragment>
          {placeholder && <option value="">{placeholder}</option>}
          {options &&
            options.map((item, index) => (
              <option key={item.key || index} value={item.value}>
                {item.text || item.name}
              </option>
            ))}
        </React.Fragment>
      </select>
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
}

export function DateTime({
  type,
  value,
  label,
  placeholder,
  dateFormat,
  valueFormater,
  name,
  ...rest
}) {
  const [selected, setSelected] = useState();
  const {
    register,
    errors,
    watch,
    setValue,
    getValues,
    unregister,
  } = useFormContext();

  useEffect(() => {
    register({ name });
    return () => unregister(name);
  }, [register]);

  useEffect(() => {
    value && setSelected(new Date(value));
  }, [value]);

  useEffect(() => {
    let value = watch(name);
    if (!value && selected) {
      setSelected(null);
    }
  }, [watch(name)]);

  const handleOnChange = useCallback((value, e) => {
    if (value) {
      let date =
        dateFormat && dateFormat !== "yyyy-MM-dd"
          ? value
          : formatDate(value).split(" ")[0];
      if (valueFormater) {
        setValue(name, valueFormater(date));
      } else {
        setValue(name, date);
      }
      setSelected(value);
    } else {
      setValue(name, "");
      setSelected(undefined);
    }
  });

  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}
      <DatePicker
        isClearable
        placeholderText={placeholder}
        selected={selected}
        dateFormat={dateFormat || "yyyy-MM-dd"}
        onChange={handleOnChange}
        popperClassName={styles.poperClass}
        {...rest}
      />
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
}

// const dobOptions = {
// 	dateFormat: 'yyyy-MM-dd',
// 	isClearable: true,
// 	showYearDropdown: true,
// 	dateFormatCalendar: "MMMM",
// 	scrollableYearDropdown: true,
// 	yearDropdownItemNumber: 30,
// 	showMonthDropdown: true,
//   useShortMonthInDropdown: true,
// }

export function DateRange({
  type,
  label,
  placeholder,
  dateFormat,
  start_name,
  end_name,
  ...rest
}) {
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [shouldCloseOnSelect, toggleCloseOnSelect] = useState(false);

  const {
    register,
    errors,
    watch,
    setValue,
    getValues,
    unregister,
  } = useFormContext();
  let startVal = getValues(start_name);
  let endVal = getValues(end_name);

  useEffect(() => {
    register({ name: start_name });
    register({ name: end_name });

    if (!startVal) setStartDate(undefined);
    if (!endVal) setEndDate(undefined);
    if (!startVal && !endVal) toggleCloseOnSelect(false);

    () => unregister([start_name, end_name]);
  }, [register]);

  const handleFormat = (value) => {
    if (!value) return "";
    return dateFormat && dateFormat !== "yyyy-MM-dd"
      ? value
      : formatDate(value).split(" ")[0];
  };

  const handleFormatRange = (d1, d2) => {
    return `${d1 ? formatDate(d1).split(" ")[0] : "?"} to ${
      d2 ? formatDate(d2).split(" ")[0] : "?"
    }`;
  };

  const handleDateChange = (date) => {
    if (!startDate) {
      setValue(start_name, handleFormat(date));
      setStartDate(date);
      toggleCloseOnSelect(true);
      return;
    }

    if (startDate && !endDate) {
      toggleCloseOnSelect(false);
      setValue(end_name, handleFormat(date));
      setEndDate(date);
      return;
    }

    if (startDate && endDate) {
      toggleCloseOnSelect(true);
      setStartDate(date);
      setValue(start_name, handleFormat(date));
      setValue(end_name, undefined);
      setEndDate(undefined);
      return;
    }
  };

  const handleSelect = (date) => {
    if (startDate && !endDate && sameDay(date, startDate)) {
      handleDateChange(date);
    }
  };

  const sameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}

      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        onSelect={handleSelect}
        selectsEnd={Boolean(startDate)}
        dateFormat={dateFormat || "yyyy-MM-dd"}
        startDate={startDate}
        shouldCloseOnSelect={shouldCloseOnSelect}
        endDate={endDate}
        popperClassName={styles.poperClass}
        showMonthDropdown
        showYearDropdown
        customInput={
          <div>
            <input
              placeholder={placeholder}
              value={
                startDate || startVal
                  ? handleFormatRange(startDate || startVal, endDate || endVal)
                  : ""
              }
            />
          </div>
        }
        {...rest}
      ></DatePicker>
      {errors[start_name] && (
        <p className={styles.error}>{errors[start_name].message}</p>
      )}
    </div>
  );
}
