import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders App component and initial elements", () => {
    render(<App />);
    
    // Verifica se os campos de peso, altura, idade e sexo estão presentes
    const pesoInput = screen.getByLabelText(/peso/i);
    const alturaInput = screen.getByLabelText(/altura/i);
    const idadeInput = screen.getByLabelText(/idade/i);
    const sexoInput = screen.getByLabelText(/sexo/i);
    const calcularIMCButton = screen.getByText(/calcular imc/i);
    const calcularBMRButton = screen.getByText(/calcular bmr/i);

    expect(pesoInput).toBeInTheDocument();
    expect(alturaInput).toBeInTheDocument();
    expect(idadeInput).toBeInTheDocument();
    expect(sexoInput).toBeInTheDocument();
    expect(calcularIMCButton).toBeInTheDocument();
    expect(calcularBMRButton).toBeInTheDocument();
  });

  test("Calcular IMC corretamente", () => {
    render(<App />);
    
    // Simula a entrada de peso e altura
    const pesoInput = screen.getByLabelText(/peso/i);
    const alturaInput = screen.getByLabelText(/altura/i);
    const calcularIMCButton = screen.getByText(/calcular imc/i);
    
    fireEvent.change(pesoInput, { target: { value: "70" } });
    fireEvent.change(alturaInput, { target: { value: "1.75" } });
    fireEvent.click(calcularIMCButton);
    
    const resultado = screen.getByText(/resultado imc:/i);
    expect(resultado).toHaveTextContent("Resultado IMC: 22.86"); // Ajuste conforme o cálculo esperado
  });

  test("calcular a TMB corretamente para homens", () => {
    render(<App />);
    
    // Simula a entrada de peso, altura, idade e sexo
    const pesoInput = screen.getByLabelText(/peso/i);
    const alturaInput = screen.getByLabelText(/altura/i);
    const idadeInput = screen.getByLabelText(/idade/i);
    const sexoInput = screen.getByLabelText(/sexo/i);
    const calcularBMRButton = screen.getByText(/calcular bmr/i);
    
    fireEvent.change(pesoInput, { target: { value: "70" } });
    fireEvent.change(alturaInput, { target: { value: "175" } });
    fireEvent.change(idadeInput, { target: { value: "25" } });
    fireEvent.change(sexoInput, { target: { value: "male" } });
    fireEvent.click(calcularBMRButton);
    
    const resultado = screen.getByText(/resultado bmr:/i);
    expect(resultado).toHaveTextContent("Resultado BMR: 1724.05"); // Ajuste conforme o cálculo esperado
  });

  test("calcular a TMB corretamente para mulheres", () => {
    render(<App />);
  
    // Simula a entrada de dados
    const pesoInput = screen.getByLabelText(/peso/i);
    const alturaInput = screen.getByLabelText(/altura/i);
    const idadeInput = screen.getByLabelText(/idade/i);
    const sexoInput = screen.getByLabelText(/sexo/i);
    const calcularButton = screen.getByText(/calcular bmr/i);
  
    fireEvent.change(pesoInput, { target: { value: "60" } });
    fireEvent.change(alturaInput, { target: { value: "165" } });
    fireEvent.change(idadeInput, { target: { value: "30" } });
    fireEvent.change(sexoInput, { target: { value: "female" } });
  
    fireEvent.click(calcularButton);
  
    // Verifica se o resultado da TMB é o esperado
    const resultado = screen.getByText(/resultado bmr/i);
    expect(resultado).toHaveTextContent("Resultado BMR: 1383.68");
  });
  
});
