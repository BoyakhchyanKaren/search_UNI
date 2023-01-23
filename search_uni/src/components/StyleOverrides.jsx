import { borders, margins, paddings } from '../themes/themeConstants';

export const MuiListItemButton = (textColor, menuSelected, menuSelectedBack) => ({
    styleOverrides: {
        root: {
            color: textColor,
            paddingTop: paddings.top12,
            paddingBottom: paddings.bottom12,
            '&.Mui-selected': {
                color: menuSelected,
                backgroundColor: menuSelectedBack,
                '&:hover': {
                    backgroundColor: menuSelectedBack
                },
                '& .MuiListItemIcon-root': {
                    color: menuSelected
                }
            },
            '&:hover': {
                backgroundColor: menuSelectedBack,
                color: menuSelected,
                '& .MuiListItemIcon-root': {
                    color: menuSelected
                }
            }
        }
    }
});

export const MuiButton = (color) => ({
    styleOverrides: {
        root: {
            fontWeight: 500,
            borderRadius: '4px',
            borderColor: color
        }
    }
});

export const MuiTablePagination = {
    styleOverrides: {
        selectRoot: {
            '&': {
                pointerEvents: 'none'
            },
            '& > svg': {
                display: 'none'
            }
        }
    }
};

export const MuiPaper = (borderRadius) => ({
    defaultProps: {
        elevation: 0
    },
    styleOverrides: {
        root: {
            backgroundImage: 'none'
        },
        rounded: {
            borderRadius: `${borderRadius}px`
        }
    }
});

export const MuiCardHeader = (textColor) => ({
    styleOverrides: {
        root: {
            color: textColor,
            padding: paddings.all24
        },
        title: {
            fontSize: '1.125rem'
        }
    }
});

export const MuiCardContent = {
    styleOverrides: {
        root: {
            padding: paddings.all24
        }
    }
};

export const MuiCardActions = {
    styleOverrides: {
        root: {
            padding: paddings.all24
        }
    }
};

export const MuiAlert = {
    styleOverrides: {
        root: {
            alignItems: 'center'
        },
        outlined: {
            border: '1px dashed'
        }
    }
};

export const MuiListItemIcon = (textColor) => ({
    styleOverrides: {
        root: {
            color: textColor,
            minWidth: '36px'
        }
    }
});

export const MuiListItemText = (textColor) => ({
    styleOverrides: {
        primary: {
            color: textColor
        }
    }
});

export const MuiInputBase = (textColor, textColorSecondary) => ({
    styleOverrides: {
        input: {
            color: textColor,
            '&::placeholder': {
                color: textColorSecondary,
                fontSize: '0.875rem'
            }
        }
    }
});

export const MuiOutlinedInput = (
    outlinedFilled,
    bgColor,
    borderRadius,
    borderColor,
    color
) => ({
    styleOverrides: {
        root: {
            background: outlinedFilled ? bgColor : 'transparent',
            borderRadius: `${borderRadius}px`,
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor
            },
            '&:hover $notchedOutline': {
                borderColor: color
            },
            '&.MuiInputBase-multiline': {
                padding: paddings.all2
            }
        },
        input: {
            fontWeight: 500,
            background: outlinedFilled ? bgColor : 'transparent',
            padding: `${paddings.topBottom16} ${paddings.leftRight12}`,
            borderRadius: `${borderRadius}px`,
            '&.MuiInputBase-inputSizeSmall': {
                padding: `${paddings.topBottom12} ${paddings.leftRight16}`,
                '&.MuiInputBase-inputAdornedStart': {
                    paddingLeft: paddings.left0
                }
            }
        },
        inputAdornedStart: {
            paddingLeft: paddings.left4
        },
        notchedOutline: {
            borderRadius: `${borderRadius}px`
        }
    }
});

export const MuiSlider = (textColor, disabledColor, bgColor) => ({
    styleOverrides: {
        root: {
            '&.Mui-disabled': {
                color: disabledColor
            }
        },
        mark: {
            backgroundColor: bgColor,
            width: '4px'
        },
        valueLabel: {
            color: textColor
        }
    }
});

export const MuiAutocomplete = (
    secondaryColor,
    darkColor,
    iconColor,
    borderRadius
) => ({
    styleOverrides: {
        root: {
            '& .MuiAutocomplete-tag': {
                background: secondaryColor,
                borderRadius: 4,
                '.MuiChip-deleteIcon': {
                    color: iconColor
                }
            }
        },
        popper: {
            borderRadius: `${borderRadius}px`,
            boxShadow:
                '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)'
        }
    }
});

export const MuiDivider = (dividerColor) => ({
    styleOverrides: {
        root: {
            borderColor: dividerColor,
            opacity: 1
        }
    }
});

export const MuiSelect = {
    styleOverrides: {
        select: {
            '&:focus': {
                backgroundColor: 'transparent'
            }
        }
    }
};

export const MuiAvatar = (textColor, bgColor) => ({
    styleOverrides: {
        root: {
            color: textColor,
            background: bgColor
        }
    }
});

export const MuiChip = {
    styleOverrides: {
        root: {
            '&.MuiChip-deletable .MuiChip-deleteIcon': {
                color: 'inherit'
            }
        }
    }
};

export const MuiTimelineContent = (textColor) => ({
    styleOverrides: {
        root: {
            color: textColor,
            fontSize: '16px'
        }
    }
});

export const MuiTreeItem = {
    styleOverrides: {
        label: {
            marginTop: margins.top16,
            marginBottom: margins.bottom16
        }
    }
};

export const MuiTimelineDot = {
    styleOverrides: {
        root: {
            boxShadow: 'none'
        }
    }
};

export const MuiInternalDateTimePickerTabs = (
    tabColor,
    borderColor,
    tabTextColor,
    textColorDark
) => ({
    styleOverrides: {
        tabs: {
            backgroundColor: tabColor,
            '& .MuiTabs-flexContainer': {
                borderColor
            },
            '& .MuiTab-root': {
                color: tabTextColor
            },
            '& .MuiTabs-indicator': {
                backgroundColor: textColorDark
            },
            '& .Mui-selected': {
                color: textColorDark
            }
        }
    }
});

export const MuiTabs = (borderColor) => ({
    styleOverrides: {
        flexContainer: {
            borderBottom: `${borders.solid1px}`,
            borderColor
        }
    }
});

export const MuiDialog = {
    styleOverrides: {
        paper: {
            padding: `${paddings.top12} ${paddings.right0} ${paddings.bottom12} ${paddings.left0}`
        }
    }
};

export const MuiTableCell = (borderColor, textColor) => ({
    styleOverrides: {
        root: {
            borderColor,
            '&.MuiTableCell-head': {
                fontSize: '0.875rem',
                color: textColor,
                fontWeight: 500
            }
        }
    }
});

export const MuiTooltip = (color, background) => ({
    styleOverrides: {
        tooltip: {
            color,
            background
        }
    }
});
export const MuiPickersToolbar = () => ({
    styleOverrides: {
        root: {
            '& > span': {
                display: 'block',
                width: '100%',
                textAlign: 'center',
                color: 'black'
            },
            '& > .MuiPickersToolbar-content button span': {
                fontSize: '16px'
            },
            '& > .MuiPickersToolbar-content span': {
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center'
            },
            '& > .MuiPickersToolbar-content .MuiDateTimePickerToolbar-dateContainer': {
                marginTop: margins.top8,
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                alignItems: 'center',
                gridColumnGap: '8px',
                '& button span': {
                    color: 'black',
                    fontWeight: '400'
                },
                '& button:nth-child(2) span': {
                    paddingTop: paddings.top2
                }
            }
        },
        '& > timeContainer > button > span': {
            fontSize: '10px'
        }
    }
});
export const MuiClockPicker = (lightColor, mainColor, secondary200, secondaryMain) => ({
    styleOverrides: {
        root: {
            '& > div > div': {
                backgroundColor: secondary200,
                marginBottom: margins.bottom32
            },
            '& .MuiButtonBase-root > span': {
                color: secondaryMain
            }
        }
    }
});

export const MuiDialogTitle = {
    styleOverrides: {
        root: {
            fontSize: '1.25rem'
        }
    }
};
