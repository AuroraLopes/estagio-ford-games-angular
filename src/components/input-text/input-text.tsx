import { Component, Prop, Host, h, State, Event, EventEmitter } from '@stencil/core';

export type Status = 'default' | 'success' | 'error';
export type Size = 'small' | 'large';

@Component({
  tag: 'input-text',
  styleUrl: 'input-text.css',
  shadow: true,
})
export class InputText {
  @Prop() labels: string[] = []; // Array de legendas
  @Prop() selectedLabelIndex: number = 0; // Índice da legenda selecionada
  @Prop() placeholders: string[] = []; // Array de placeholders
  @Prop() selectedPlaceholderIndex: number = 0; // Índice do placeholder selecionado
  @Prop() variant: 'primary' | 'secondary' = 'primary'; // Variantes de estilo
  @Prop() size: Size = 'small'; // Tamanho do input
  @Prop() optional: boolean = false; // Campo opcional
  @Prop() status: Status = 'default'; // Status do campo (default, success, error)
  @Prop() helperTexts: string[] = []; // Array de helper texts
  @Prop() selectedHelperTextIndex: number = 0; // Índice do helper text selecionado
  @Prop() value: string = ''; // Valor do campo
  @Prop() disabled: boolean = false; // Controla o estado desabilitado

  // Estado interno para controlar o valor atual do input
  @State() internalValue: string = this.value;

  // Evento que emite o valor atualizado do campo
  @Event() valueChanged: EventEmitter<string>;

  // Método para capturar mudanças no campo de entrada e emitir o evento
  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.internalValue = input.value;
    this.valueChanged.emit(this.internalValue); // Emite o valor atualizado
  }

  render() {
    const label = this.labels[this.selectedLabelIndex];
    const placeholder = this.placeholders[this.selectedPlaceholderIndex];
    const helperText = this.helperTexts[this.selectedHelperTextIndex];
    const isDisabled = this.disabled;

    return (
      <Host>
        <div
          class={`input-wrapper ${this.variant} ${this.status} ${this.size} ${isDisabled ? 'disabled' : ''}`}
        >
          {/* Legenda */}
          <label htmlFor="input-text">
            {label} {this.optional && '(Optional)'}
          </label>

          {/* Campo de entrada */}
          <input
            type="text"
            name="input-text"
            id="input-text"
            placeholder={placeholder}
            value={this.internalValue}
            class={this.status}
            onInput={(event) => this.handleInputChange(event)}
            disabled={isDisabled}
          />

          {/* Texto de ajuda */}
          {!isDisabled && helperText && (
            <small class="helper-text">{helperText}</small>
          )}
        </div>
      </Host>
    );
  }
}
