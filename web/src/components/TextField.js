import React from 'react'
import TextField from '@material-ui/core/TextField'

var MyTextField = function MyTextField (_ref) {
    var placeHolder = _ref.placeHolder,
        defaultValue= _ref.defaultValue,
        views= _ref.views,
        disabled = _ref.disabled,
        value = _ref.value,
        handler = _ref.handler,
        id = _ref.id,
        inputProps= _ref.inputProps,
        rows = _ref.rows,
        name = _ref.name,
        selectProps = _ref.selectProps,
        helperText = _ref.helperText,
        variant = _ref.variant,
        color = _ref.color,
        required = _ref.required,
        fullWidth = _ref.fullWidth,
        autoFocus = _ref.autofocus,
        me = _ref.me,
        style = _ref.style,
        nativeSelectProps = _ref.nativeSelectProps,
        label = _ref.label,
        className = _ref.className,
        type = _ref.type,
        _ref$onKeyPress = _ref.onKeyPress,
        error = _ref.error,
        errorText = _ref.errorText,
        maxLength = _ref.maxLength,
        minLength = _ref.minLength,
        display = _ref.display,
        marginLeft = _ref.marginLeft,
        onChange = _ref.onChange,
        onKeyPress = _ref$onKeyPress === void 0 ? function () {} : _ref$onKeyPress

    var handleInput = function handleInput (event) {
        if (_ref.select)
            return handler(event)
        return handler(me, event.target.value)

    }

    var handleKeyPress = function handleKeyPress (event) {
        return onKeyPress(event.key)
    }

    var handleTextInput = (event) => {
        return handler(me, event.target.value)
    }

    return (
        <TextField
            type={type}
            value={value}
            name={name}
            disabled={disabled}
            className={className}
            onChange={handleInput}
            placeholder={placeHolder}
            onKeyPress={handleKeyPress}
            onInput={handleInput}
            helperText={helperText}
            defaultValue={defaultValue}
            id={id}
            views={views}
            select={_ref.select ? true : false}
            selectProps={selectProps ? true : false}
            required={required ? true : false}
            fullWidth={fullWidth ? true : false}
            autoFocus={autoFocus ? true : false}
            margin="normal"
            error ={error}
            errorText ={errorText}
            style={style}
            maxLength={maxLength}
            minLength ={minLength}
            label={label}
            rows={rows}
            marginLeft={marginLeft}
            display ={display}
            inputProps={inputProps}
            variant={variant}
            nativeSelectProps={nativeSelectProps ? true : false}
            color={color}
        >
            {_ref.children}
        </TextField>
    )
}

export default MyTextField
