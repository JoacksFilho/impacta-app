import { Stack, TextField } from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import  { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';


interface DatePickerSettings {
  label: string;
  onChange: (date: Date | null) => void; // Adicionamos uma função de retorno de chamada para passar a data selecionada de volta ao componente pai
}

const DatePickerFormated: React.FC<DatePickerSettings> = (props) => {
  // const [value, setValue] = React.useState<Dayjs | null>(null);
  const handleDateChange = (date: Date | null) => {
    console.log('Data selecionada:', date); // Verifica se a data está sendo capturada corretamente
    props.onChange(date); // Passa a data selecionada de volta ao componente pai
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
        label={props.label}      
        onChange={handleDateChange} 
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePickerFormated;