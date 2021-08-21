import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';

import { greyScheme } from './util/colorPallete';

import StylingTabs from './StylingTabs';

const useStyles = makeStyles({
  editorBar: {
    borderLeft: `1px solid`,
    borderColor: greyScheme.lighterGray,
  },
  editorFormContainer: {
    padding: '10px',
  },
  editorBarHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: greyScheme.lighterGray,
    alignItems: 'center',
    padding: '1px 10px',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)',
  },
  editorBarInput: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 10px',
  },
});

export default function EditorPanel({ component, components, setShowEditor, addComponent }) {
  const classes = useStyles();
  const { __typename, ...otherComponentProps } = component;

  return (
    <div className={classes.editorBar}>
      <div className={classes.editorBarHeader}>
        <h3>Editor Panel</h3>
        <CloseIcon onClick={() => setShowEditor(null)} />
      </div>
      <div className={classes.editorBarInput}>
        <h4>Value</h4>
        <Input
          value={component.value}
          onChange={(e) => {
            const updatedComponent = {
              variables: {
                component: {
                  ...otherComponentProps,
                  value: e.target.value,
                },
              },
            };
            addComponent(updatedComponent);
          }}
        />
        <h4>Styling</h4>
        <StylingTabs
          component={otherComponentProps}
          components={components}
          addComponent={addComponent}
        />
      </div>
    </div>
  );
}
