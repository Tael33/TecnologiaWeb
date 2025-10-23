import os
import pyttsx3
import speech_recognition as sr
import json
from flask import Flask, request, jsonify

# Inicializar Text-to-Speech (TTS)
engine = pyttsx3.init()

# Base de conhecimento local
base_conhecimento = "base_conhecimento.json"

# Garantir que o arquivo da base exista
if not os.path.exists(base_conhecimento):
    with open(base_conhecimento, "w") as file:
        json.dump({}, file)

# Funções principais


def falar(texto):
    """Converte texto em fala."""
    engine.say(texto)
    engine.runAndWait()


def ouvir():
    """Capta áudio do microfone e converte em texto."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Estou ouvindo...")
        try:
            audio = recognizer.listen(source)
            texto = recognizer.recognize_google(audio, language="pt-BR")
            return texto
        except sr.UnknownValueError:
            return "Não entendi o que você disse."
        except sr.RequestError:
            return "Erro ao conectar ao serviço de reconhecimento de fala."


def aprender(novo_conhecimento):
    """Armazena novas informações na base de conhecimento."""
    with open(base_conhecimento, "r+") as file:
        dados = json.load(file)
        chave, conteudo = novo_conhecimento.split(":", 1)
        dados[chave.strip()] = conteudo.strip()
        file.seek(0)
        json.dump(dados, file, indent=4)
        file.truncate()


def consultar_base(chave):
    """Consulta a base de conhecimento local."""
    with open(base_conhecimento, "r") as file:
        dados = json.load(file)
        return dados.get(chave, "Não encontrei nada relacionado na base de conhecimento.")


# Inicializar servidor Flask
app = Flask(__name__)


@app.route("/fala", methods=["POST"])
def fala():
    """Endpoint para converter texto em fala."""
    dados = request.json
    texto = dados.get("texto", "")
    if texto:
        falar(texto)
        return jsonify({"mensagem": "Texto falado com sucesso!"})
    return jsonify({"erro": "Nenhum texto fornecido."}), 400


@app.route("/ouve", methods=["GET"])
def ouve():
    """Endpoint para captar áudio e retornar texto."""
    texto = ouvir()
    return jsonify({"texto": texto})


@app.route("/resposta", methods=["POST"])
def resposta():
    """Endpoint para responder a perguntas usando a base local."""
    dados = request.json
    pergunta = dados.get("pergunta", "")
    if pergunta:
        resposta = consultar_base(pergunta)
        return jsonify({"resposta": resposta})
    return jsonify({"erro": "Nenhuma pergunta fornecida."}), 400


@app.route("/aprender", methods=["POST"])
def aprender_endpoint():
    """Endpoint para adicionar novos conhecimentos à base."""
    dados = request.json
    conhecimento = dados.get("conhecimento", "")
    if conhecimento:
        aprender(conhecimento)
        return jsonify({"mensagem": "Conhecimento adicionado com sucesso!"})
    return jsonify({"erro": "Nenhum conhecimento fornecido."}), 400


if __name__ == "__main__":
    app.run(debug=True, port=8080)
