import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Atrio",
  description:
    "Aviso de privacidad integral conforme a la LFPDPPP (México) — tratamiento de datos en lista de espera y newsletter Atrio.",
};

const CONTACT_EMAIL = "privacidad@useatrio.com";

export default function PrivacidadPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-0">
        <Link
          href="/"
          className="text-sm text-muted-foreground underline underline-offset-4 transition-opacity hover:text-foreground"
        >
          Volver al inicio
        </Link>

        <h1 className="mb-12 mt-8 text-4xl font-light tracking-tight text-foreground md:text-5xl">
          Aviso de Privacidad Integral
        </h1>

        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          De conformidad con lo establecido en la Ley Federal de Protección de
          Datos Personales en Posesión de los Particulares (en adelante, la
          &quot;Ley&quot;), el responsable del tratamiento de datos personales
          asociado a la marca comercial{" "}
          <strong className="font-medium text-foreground">Atrio</strong> (en
          adelante, &quot;Atrio&quot;), con domicilio en{" "}
          <strong className="font-medium text-foreground">
            Monterrey, Nuevo León, México
          </strong>
          , es el responsable del uso y protección de sus datos personales, y al
          respecto le informa lo siguiente:
        </p>

        <h2 className="mb-4 mt-12 text-xl font-semibold text-foreground">
          1. Datos Personales que recabamos
        </h2>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Para llevar a cabo las finalidades descritas en el presente aviso de
          privacidad, recabaremos los siguientes datos personales:
        </p>
        <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
          <li className="text-base leading-relaxed">
            <strong className="font-medium text-foreground">
              Datos de identificación y contacto:
            </strong>{" "}
            Nombre completo, número de WhatsApp y correo electrónico.
          </li>
          <li className="text-base leading-relaxed">
            <strong className="font-medium text-foreground">
              Datos profesionales y patrimoniales:
            </strong>{" "}
            Zonas de operación inmobiliaria, volumen de propiedades en exclusiva
            y ticket promedio en operaciones de venta y renta.
          </li>
        </ul>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Atrio no recaba datos personales sensibles para este registro.
        </p>

        <h2 className="mb-4 mt-12 text-xl font-semibold text-foreground">
          2. Finalidades del tratamiento de datos
        </h2>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Los datos personales que recabamos de usted los utilizaremos para las
          siguientes finalidades primarias, que son necesarias para el servicio
          que solicita:
        </p>
        <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
          <li className="text-base leading-relaxed">
            Evaluar su perfil profesional para determinar su viabilidad como
            broker fundador en nuestra red privada.
          </li>
          <li className="text-base leading-relaxed">
            Gestionar su inscripción en nuestra lista de espera (Waitlist).
          </li>
          <li className="text-base leading-relaxed">
            Contactarle vía correo electrónico o WhatsApp para informarle sobre
            el estatus de su solicitud, agendar entrevistas o darle acceso a la
            plataforma.
          </li>
        </ul>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          De manera adicional, utilizaremos su información personal para las
          siguientes finalidades secundarias, que nos permiten brindarle un
          mejor servicio (siempre y cuando haya otorgado su consentimiento):
        </p>
        <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
          <li className="text-base leading-relaxed">
            Envío de nuestro newsletter con actualizaciones del producto, noticias
            del sector e invitaciones a eventos exclusivos.
          </li>
          <li className="text-base leading-relaxed">
            Fines estadísticos y de análisis de mercado interno.
          </li>
        </ul>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          En caso de que no desee que sus datos personales sean tratados para
          estos fines secundarios, puede comunicarlo en cualquier momento
          enviando un correo a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <h2 className="mb-4 mt-12 text-xl font-semibold text-foreground">
          3. Transferencia de Datos Personales
        </h2>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Le informamos que sus datos personales no serán vendidos, cedidos ni
          transferidos a terceros con fines de lucro. Atrio únicamente podrá
          compartir sus datos con proveedores de servicios tecnológicos (como
          servicios de hosting o envío de correos) que nos asisten en la
          operación de la plataforma, los cuales están obligados a mantener la
          confidencialidad de la información conforme a este mismo aviso.
        </p>

        <h2 className="mb-4 mt-12 text-xl font-semibold text-foreground">
          4. Ejercicio de Derechos ARCO
        </h2>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Usted tiene derecho a conocer qué datos personales tenemos de usted,
          para qué los utilizamos y las condiciones del uso que les damos
          (Acceso). Asimismo, es su derecho solicitar la corrección de su
          información personal en caso de que esté desactualizada, sea inexacta
          o incompleta (Rectificación); que la eliminemos de nuestros registros
          o bases de datos (Cancelación); así como oponerse al uso de sus datos
          personales para fines específicos (Oposición). Estos derechos se
          conocen como derechos ARCO.
        </p>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Para el ejercicio de cualquiera de los derechos ARCO, o para revocar
          su consentimiento, usted deberá presentar la solicitud respectiva a
          través del siguiente correo electrónico:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
          >
            {CONTACT_EMAIL}
          </a>
          . Su solicitud será atendida en un plazo máximo de 20 días hábiles.
        </p>

        <h2 className="mb-4 mt-12 text-xl font-semibold text-foreground">
          5. Uso de tecnologías de rastreo (Cookies)
        </h2>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Le informamos que en nuestra página de internet podríamos utilizar
          cookies, web beacons u otras tecnologías, a través de las cuales es
          posible monitorear su comportamiento como usuario de internet, así como
          brindarle un mejor servicio y experiencia al navegar en nuestra
          página.
        </p>

        <h2 className="mb-4 mt-12 text-xl font-semibold text-foreground">
          6. Cambios al Aviso de Privacidad
        </h2>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          El presente aviso de privacidad puede sufrir modificaciones, cambios o
          actualizaciones derivadas de nuevos requerimientos legales, de
          nuestras propias necesidades por los servicios que ofrecemos o por
          cambios en nuestro modelo de negocio. Nos comprometemos a mantenerlo
          informado sobre los cambios que pueda sufrir el presente aviso de
          privacidad mediante la publicación de la versión actualizada en esta
          misma página web.
        </p>

        <p className="text-base leading-relaxed text-muted-foreground">
          <strong className="font-medium text-foreground">
            Última actualización:
          </strong>{" "}
          abril de 2026.
        </p>
      </div>
    </main>
  );
}
