import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() labels: string[] = ['Nome Completo', 'Nome de Usuário', 'Nome para Exibição'];
  @State() placeholders: string[] = ['Digite seu nome completo', 'Escolha um nome de usuário', 'Nome visível no site'];
  @State() helperTexts: string[] = ['Preencha este campo', 'Dica: Utilize um nome único', 'Informe um nome apropriado'];

  @State() selectedLabelIndex: number = 0;
  @State() selectedPlaceholderIndex: number = 0;
  @State() selectedHelperTextIndex: number = 0;
  @State() value: string = '';
  @State() status: 'default' | 'success' | 'error' = 'default';
  @State() optional: boolean = true;
  @State() disabled: boolean = false;

  handleValueChanged(event: CustomEvent) {
    this.value = event.detail;
    console.log("Valor do input:", this.value);
  }

  cycleStatus() {
    const statuses: ('default' | 'success' | 'error')[] = ['default', 'success', 'error'];
    const nextIndex = (statuses.indexOf(this.status) + 1) % statuses.length;
    this.status = statuses[nextIndex];
  }

  toggleOptional() {
    this.optional = !this.optional;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  handleSubmit() {
    console.log("Enviado com sucesso! Valor do input:", this.value);
    // Simule uma ação de envio (ex.: enviar para uma API)
    alert(`Valor enviado: ${this.value}`);
  }

  render() {
    return (
      <div class="app-container">
        <h1>Formulário de Entrada</h1>

        <input-text
          labels={this.labels}
          placeholders={this.placeholders}
          selectedLabelIndex={this.selectedLabelIndex}
          selectedPlaceholderIndex={this.selectedPlaceholderIndex}
          helperTexts={this.helperTexts}
          selectedHelperTextIndex={this.selectedHelperTextIndex}
          variant="primary"
          size="large"
          optional={this.optional}
          status={this.status}
          value={this.value}
          disabled={this.disabled}
          onValueChanged={(event) => this.handleValueChanged(event)}
        ></input-text>

        {/* Exibir o valor do input na tela */}
        <div>
          <p><strong>Valor Atual: </strong>{this.value}</p>
        </div>

        <button onClick={() => this.selectedLabelIndex = (this.selectedLabelIndex + 1) % this.labels.length}>
          Trocar Legenda
        </button>
        <button onClick={() => this.selectedPlaceholderIndex = (this.selectedPlaceholderIndex + 1) % this.placeholders.length}>
          Trocar Placeholder
        </button>
        <button onClick={() => this.cycleStatus()}>
          Trocar Status
        </button>
        <button onClick={() => this.toggleOptional()}>
          {this.optional ? 'Desativar Optional' : 'Ativar Optional'}
        </button>
        <button onClick={() => this.toggleDisabled()}>
          {this.disabled ? 'Habilitar Campo' : 'Desabilitar Campo'}
        </button>

        {/* Botão para enviar */}
        <button onClick={() => this.handleSubmit()}>
          Enviar
        </button>
      </div>
    );
  }
}
