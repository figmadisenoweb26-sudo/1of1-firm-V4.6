"use client"

import { useState } from "react"
import { X, Calendar, MapPin, Ticket } from "lucide-react"

interface Event {
  id: string
  name: string
  date: string
  location: string
  image: string
  ticketTypes: {
    name: string
    price: string
    description: string
  }[]
  whatsappNumber: string
  accentColor: string
}

const signatureEvents: Event[] = [
  {
    id: "championship",
    name: "THE 1 OF 1 CHAMPIONSHIP",
    date: "Próximamente",
    location: "Por confirmar",
    image: "https://f005.backblazeb2.com/file/b21of1firm/background/CHAMPtarj2.jpg",
    ticketTypes: [
      { name: "General", price: "$150 USD", description: "Acceso general al evento" },
      { name: "VIP", price: "$350 USD", description: "Acceso VIP + Meet & Greet" },
      { name: "Ringside", price: "$500 USD", description: "Primera fila + Experiencia exclusiva" },
    ],
    whatsappNumber: "573000000000",
    accentColor: "red",
  },
  {
    id: "celestial",
    name: "MISS 1 OF 1 CELESTIAL",
    date: "Próximamente",
    location: "Por confirmar",
    image: "https://f005.backblazeb2.com/file/b21of1firm/background/MChome.png",
    ticketTypes: [
      { name: "General", price: "$100 USD", description: "Acceso general" },
      { name: "VIP", price: "$250 USD", description: "Acceso VIP + Champagne" },
      { name: "Table", price: "$800 USD", description: "Mesa VIP para 4 personas" },
    ],
    whatsappNumber: "573000000000",
    accentColor: "amber",
  },
  {
    id: "animal",
    name: "ANIMAL",
    date: "17 Mayo 2027",
    location: "Por confirmar",
    image: "https://f005.backblazeb2.com/file/b21of1firm/background/ANexp.jpg",
    ticketTypes: [
      { name: "Early Bird", price: "$80 USD", description: "Precio especial limitado" },
      { name: "General", price: "$120 USD", description: "Acceso general" },
      { name: "VIP", price: "$280 USD", description: "Acceso VIP + Barra libre" },
    ],
    whatsappNumber: "573000000000",
    accentColor: "amber",
  },
  {
    id: "la-festa",
    name: "LA FESTA",
    date: "15 Febrero 2027",
    location: "Por confirmar",
    image: "https://f005.backblazeb2.com/file/b21of1firm/background/LFexp.jpg",
    ticketTypes: [
      { name: "General", price: "$90 USD", description: "Acceso general" },
      { name: "VIP", price: "$200 USD", description: "Acceso VIP + Open Bar" },
      { name: "Premium Table", price: "$1,000 USD", description: "Mesa premium para 6 personas" },
    ],
    whatsappNumber: "573000000000",
    accentColor: "pink",
  },
  {
    id: "luna-llena",
    name: "LUNA LLENA",
    date: "Próximamente",
    location: "Por confirmar",
    image: "https://f005.backblazeb2.com/file/b21of1firm/background/LLhome.jpg",
    ticketTypes: [
      { name: "General", price: "$70 USD", description: "Acceso general" },
      { name: "VIP", price: "$150 USD", description: "Acceso VIP" },
    ],
    whatsappNumber: "573000000000",
    accentColor: "purple",
  },
  {
    id: "babadook",
    name: "BABADOOK",
    date: "31 Octubre 2027",
    location: "Por confirmar",
    image: "https://f005.backblazeb2.com/file/b21of1firm/background/BABexp.jpg",
    ticketTypes: [
      { name: "General", price: "$60 USD", description: "Acceso general" },
      { name: "VIP", price: "$130 USD", description: "Acceso VIP + Costume Contest" },
    ],
    whatsappNumber: "573000000000",
    accentColor: "orange",
  },
]

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface TicketSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  preSelectedEvent?: string
}

export default function TicketSelectorModal({ isOpen, onClose, preSelectedEvent }: TicketSelectorModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    preSelectedEvent ? signatureEvents.find(e => e.id === preSelectedEvent) || null : null
  )
  const [selectedTicket, setSelectedTicket] = useState<{ name: string; price: string; description: string } | null>(null)

  if (!isOpen) return null

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setSelectedTicket(null)
  }

  const handleSelectTicket = (ticket: { name: string; price: string; description: string }) => {
    setSelectedTicket(ticket)
  }

  const handleWhatsAppRedirect = () => {
    if (selectedEvent && selectedTicket) {
      const message = encodeURIComponent(
        `Hola! Estoy interesado en comprar entrada para ${selectedEvent.name}.\n\nTipo de entrada: ${selectedTicket.name}\nPrecio: ${selectedTicket.price}\n\nPor favor, confirmen disponibilidad.`
      )
      window.open(`https://wa.me/${selectedEvent.whatsappNumber}?text=${message}`, "_blank")
    }
  }

  const getAccentClasses = (color: string, type: "bg" | "border" | "text" | "hover") => {
    const colors: Record<string, Record<string, string>> = {
      red: { bg: "bg-red-500", border: "border-red-500", text: "text-red-500", hover: "hover:bg-red-600" },
      amber: { bg: "bg-amber-500", border: "border-amber-500", text: "text-amber-500", hover: "hover:bg-amber-600" },
      pink: { bg: "bg-pink-500", border: "border-pink-500", text: "text-pink-500", hover: "hover:bg-pink-600" },
      purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500", hover: "hover:bg-purple-600" },
      orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-500", hover: "hover:bg-orange-600" },
    }
    return colors[color]?.[type] || colors.amber[type]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/10 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-neutral-950 border-b border-white/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-light tracking-wider text-white">
              {selectedEvent ? "SELECCIONA TU ENTRADA" : "SELECCIONA UN EVENTO"}
            </h2>
            <p className="text-white/50 text-xs sm:text-sm tracking-wider mt-1">
              {selectedEvent ? selectedEvent.name : "SIGNATURE EVENTS"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {!selectedEvent ? (
            /* Event Selection Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {signatureEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() => handleSelectEvent(event)}
                  className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className={`text-sm sm:text-base font-bold tracking-wider ${getAccentClasses(event.accentColor, "text")}`}>
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-white/60 text-[10px] sm:text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : !selectedTicket ? (
            /* Ticket Selection */
            <div>
              {/* Back button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
              >
                <span>&larr;</span>
                <span>Volver a eventos</span>
              </button>

              {/* Event Info */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="w-full sm:w-48 aspect-video sm:aspect-square rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold tracking-wider ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                    {selectedEvent.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-white/60 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-white/60 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Ticket Types */}
              <div className="space-y-3">
                <h4 className="text-white/80 text-sm tracking-wider mb-4">TIPOS DE ENTRADA</h4>
                {selectedEvent.ticketTypes.map((ticket, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectTicket(ticket)}
                    className={`w-full p-4 border rounded-lg text-left transition-all duration-300 hover:border-white/40 ${
                      selectedTicket?.name === ticket.name 
                        ? `${getAccentClasses(selectedEvent.accentColor, "border")} bg-white/5` 
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Ticket className={`w-5 h-5 ${getAccentClasses(selectedEvent.accentColor, "text")}`} />
                        <div>
                          <p className="text-white font-medium">{ticket.name}</p>
                          <p className="text-white/50 text-xs mt-0.5">{ticket.description}</p>
                        </div>
                      </div>
                      <p className={`text-lg font-bold ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                        {ticket.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Confirmation */
            <div>
              {/* Back button */}
              <button
                onClick={() => setSelectedTicket(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
              >
                <span>&larr;</span>
                <span>Volver a entradas</span>
              </button>

              {/* Summary */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 mb-6">
                <h4 className="text-white/80 text-sm tracking-wider mb-4">RESUMEN DE TU COMPRA</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Evento</span>
                    <span className={`font-medium ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                      {selectedEvent.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Fecha</span>
                    <span className="text-white">{selectedEvent.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Tipo de entrada</span>
                    <span className="text-white">{selectedTicket.name}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Total</span>
                      <span className={`text-xl font-bold ${getAccentClasses(selectedEvent.accentColor, "text")}`}>
                        {selectedTicket.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppRedirect}
                className={`w-full flex items-center justify-center gap-3 py-4 ${getAccentClasses(selectedEvent.accentColor, "bg")} ${getAccentClasses(selectedEvent.accentColor, "hover")} text-black font-bold tracking-wider rounded-lg transition-all duration-300`}
              >
                <WhatsAppIcon />
                <span>COMPRAR POR WHATSAPP</span>
              </button>

              <p className="text-center text-white/40 text-xs mt-4">
                Serás redirigido a WhatsApp para completar tu compra
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
