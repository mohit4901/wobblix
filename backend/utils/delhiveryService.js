import axios from "axios";

/**
 * Delhivery Logistics API Integration Service
 * 
 * Instructions:
 * 1. Add DELHIVERY_API_TOKEN to your backend .env file.
 * 2. Set DELHIVERY_API_URL to:
 *    - Sandbox: https://staging-express.delhivery.com
 *    - Production: https://track.delhivery.com
 */

const token = process.env.DELHIVERY_API_TOKEN || "dbddda9ecd30bd9beb5f5f613559b8ebdba1d242";
const baseUrl = process.env.DELHIVERY_API_URL || "https://staging-express.delhivery.com";

const headers = {
  "Authorization": `Token ${token}`,
  "Content-Type": "application/json"
};

/**
 * Check serviceability of a pincode
 * @param {string} pincode 
 */
export const checkPincodeServiceability = async (pincode) => {
  try {
    const url = `${baseUrl}/cpin/format/json/?pincode=${pincode}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Delhivery Pincode Error:", error.response?.data || error.message);
    throw new Error("Failed to check pincode serviceability");
  }
};

/**
 * Create a shipment / book parcel on Delhivery
 * @param {Object} order - Wobblix Order Document
 * @param {Object} address - Shipping Address Document
 */
export const createDelhiveryShipment = async (order, address) => {
  try {
    // Delhivery API requires shipment data format
    const shipmentData = {
      shipments: [
        {
          name: address.firstName + " " + address.lastName,
          add: `${address.street}, ${address.city}`,
          pin: address.pincode,
          phone: address.phone,
          state: address.state,
          country: address.country || "India",
          
          order: order._id.toString(), // Wobblix Order ID
          payment_mode: order.paymentMethod === "COD" ? "COD" : "Prepaid",
          cod_amount: order.paymentMethod === "COD" ? order.amount : 0,
          
          // Package details
          quantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
          waybill: "", // Auto-generate AWB if left blank
          shipment_width: 10,
          shipment_height: 10,
          shipment_length: 10,
          weight: 500, // weight in grams
        }
      ],
      pickup_location: {
        name: "Wobblix Warehouse",
        add: "Warehouse Street 1, New Delhi",
        pin: "110001",
        phone: "9876543210"
      }
    };

    // Delhivery API expects data in form URL encoded: format=json&data={JSON_STRING}
    const url = `${baseUrl}/api/cmu/create.json`;
    const params = new URLSearchParams();
    params.append("format", "json");
    params.append("data", JSON.stringify(shipmentData));

    const response = await axios.post(url, params, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Delhivery Shipment Error:", error.response?.data || error.message);
    throw new Error("Failed to create Delhivery shipment");
  }
};
